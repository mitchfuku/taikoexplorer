from django.shortcuts import render, render_to_response, redirect
from django.http import HttpResponse
from django.template import RequestContext
from taikoexplorer_db.models import Video, Composer, Song, Group, SongStyle, ComposerSong
from django.forms.models import model_to_dict
from django.core import serializers
import json
import settings as templates_settings
import youtube

def youtubeSearchResults(getrequest):
  options = dict({
    "q" : getrequest.get("query", None),
    "maxResults" : getrequest.get("maxResults", 10),
    "pageToken" : getrequest.get("pageToken", "")
  })
  searchResults = youtube.youtube_search(options)
  videos = Video.objects.filter(
    vid__in=searchResults.get("vids", None)
  ).prefetch_related(
    'songs__composers', 'groups'
  )
  results = [searchResults, videos]
  return results

# takes a video db object and formats it to match the yt search result json
def formattedVideoData(video):
  return {
    "id": {
      "videoId": video.vid
    },
    "snippet": {
      "title": video.title,
      "description": video.description,
      "channelId": video.channelID,
      "channelTitle": video.channelTitle,
      "thumbnails": {
        "default": {
          "url": video.default_thumb_url
        },
        "medium": {
          "url": video.medium_thumb_url
        }
      }
    }
  }

def dbSearchResults(query):
  songs = Video.objects.filter(
    songs__title__icontains=query
  )
  groups = Video.objects.filter(
    groups__name__icontains=query
  )
  composers = Composer.objects.filter(
    full_name__icontains=query
  )
  songStyles = SongStyle.objects.filter(
    name__icontains=query
  )
  composerVideos = []
  for c in composers:
    composerVideos.extend(c.videos)
  songStyleVideos = []
  for ss in songStyles:
    songStyleVideos.extend(ss.videos)
  # this ensures that we don't get duplicate videos
  videos = list(
    set(songs) | set(groups) | set(composerVideos) | set(songStyleVideos)
  ) 
  formattedVideos = []
  for video in videos :
    formattedVideos.append(formattedVideoData(video))
  return [{"items" : formattedVideos}, videos]

# gets the proper data based on the request type
# index 0 - video data results
# index 1 - db metadata results
def searchRouter(getrequest):
  query = getrequest.get("query", None)
  type = getrequest.get("type", None)
  if type == "db":
    # search only db
    return dbSearchResults(query)
  elif type == "ytdb":
    # search both
    return None
  elif type == "yt":
    # search only youtube
    return youtubeSearchResults(getrequest)

  # default to searching db and if no results, searching youtube
  dbResults = dbSearchResults(query)
  if len(dbResults[0]["items"]) == 0:
    getrequest.type = "yt"
    return youtubeSearchResults(getrequest)
  else:
    getrequest.type = "db"
    return dbResults

# iterate through tags and create a map with the vid as the key
def rekeyAndFormatVideoData(videos):
  dataDict = {}
  for video in videos :
    songArr = json.loads(
      serializers.serialize(
        "json",
        video.songs.all()
      )
    )
    for idx, song in enumerate(songArr):
      song["fields"]["composers"] = json.loads(
        serializers.serialize(
          "json",
          video.songs.all()[idx].composers.all()
        )
      )

    dataDict[video.vid] = {
      "video-data" : model_to_dict(video),
      "groups" : json.loads(
        serializers.serialize("json", video.groups.all())
      ),
      "songs" : songArr,
    }
  return dataDict

# serve the /advanced-search directory
def advancedSearch(request):
  return render(request, 'advanced-search.html')

# serve the / directory
def home(request):
  query = request.GET.get("query", None)
  request.session["query"] = query
  # session expires in 24 hours
  request.session.set_expiry(86400)
  if request.method == 'GET':
    if query is not None :
      searchData = searchRouter(request.GET)
      searchResults = searchData[0]
      metadata = searchData[1]

      dataDict = rekeyAndFormatVideoData(metadata)

      data = {
        "videos" : searchResults,
        "metadata" : dataDict,
        "query" : query,
        "pageToken" : request.GET.get("pageToken", "")
      }

      return render(
        request,
        'search-results.html',
        {"data" : json.dumps(data)}
      )

  # if no query param, show landing page
  return render(request, 'index.html')

# serves the /yts api
def youtubeSearch(request):
  query = request.GET.get("q", None)
  query_type = request.GET.get("type", None)
  type_dict = {
    'composer': Composer, 
    'group': Group,
    'song': Song
  }
  data = []
  returnData = []
  if query is not None and query_type is not None:
    model = type_dict[query_type]
    if query_type == 'composer':
      try:
        d = model.objects.all().filter(full_name__icontains=query)
        data = d
      except Composer.DoesNotExist:
        data = []
    elif query_type == 'group':
      try:
        d = model.objects.all().filter(name__icontains=query)
        data = d
      except Group.DoesNotExist:
        data = []
    elif query_type == 'song':
      try: 
        d = model.objects.all().filter(title__icontains=query)
        data = d
      except Song.DoesNotExist:
        data = []
    if data:
      # format the data
      for entry in data:
        entity = entry
        entry = model_to_dict(entry)
        if query_type == 'composer':
          entry["text"] = entry["full_name"]
        elif query_type == 'group':
          entry["text"] = entry["name"]
        elif query_type == 'song':
          entry["text"] = entry["title"]
          entry["videos"] = json.loads(
            serializers.serialize(
              "json", 
              Video.objects.filter(
                songs__id=entry["id"]
              ).all()
            )
          )
          composerDict = json.loads(
            serializers.serialize(
              "json", 
              entity.composers.all()
            )
          )
          composerInfo = []
          for composer in composerDict:
            composerInfo.append({
              "text": composer["fields"]["full_name"],
              "id":composer["pk"]
            })
          entry["composers"] = composerInfo

          styleDict = json.loads(
            serializers.serialize(
              "json", 
              entity.styles.all()
            )
          )
          styleNames = []
          # We just need the name to set this
          for style in styleDict:
            styleNames.append(style["fields"]["name"])
          entry["styles"]  = styleNames

        returnData.append(entry)

  return HttpResponse(
      json.dumps(returnData), content_type='application/json')

#serves the /delete-video-data async request
def deleteVideoData(request):
  if request.method == 'POST':
    vid = request.POST.get("vid")
    eid = request.POST.get("eid")
    type = request.POST.get("type")
    if type == "song":
      song = Song.objects.get(pk=eid)
      Video.objects.get(vid=vid).songs.remove(song)
    elif type == "group":
      group = Group.objects.get(pk=eid)
      Video.objects.get(vid=vid).groups.remove(group)
    return HttpResponse(json.dumps("success"), content_type='application/json')
  # not a post
  return HttpResponse(json.dumps("failure"), content_type='application/json')

#serves the /add-video-data async requests
def editVideoData(request):
  if request.method == 'POST':
    vid = request.POST.get("vid")
    vtitle = request.POST.get("vtitle", None)
    vdesc = request.POST.get("vdesc", None)
    dthumb = request.POST.get("dthumb", None)
    mthumb = request.POST.get("mthumb", None)
    cid = request.POST.get("cid", None)
    ctitle = request.POST.get("ctitle", None)
    groupName = request.POST.get("group_name", None)
    songTitle = request.POST.get("song_title", None)
    composerName = request.POST.get("composer_name", None)
    songStyle = request.POST.get("song_style", None)
    forceCreateSong = request.POST.get("force_create_song", False)

    video = None
    # add new video is it's not already in the db
    video, created = Video.objects.get_or_create(
      vid=vid, 
      title=vtitle,
      description=vdesc,
      channelTitle=ctitle,
      channelID=cid,
      default_thumb_url=dthumb,
      medium_thumb_url=mthumb)
    if created:
      print("new video")
      video.save()

    if groupName is None and songTitle is None and composerName is None:
      raise Exception("No data was provided")

    # add group
    if groupName is not None:
      groupName = json.loads(groupName)
      groupArr = []
      for g in groupName :
        group = None
        if type(g['id']) is not int: 
          print("new group")
          group = Group(name=g['id'])
          group.save()
        else:
          group = Group.objects.get(pk=g['id'])
        video.groups.add(group)
        groupArr.append(model_to_dict(group))
      return HttpResponse(
          json.dumps(groupArr), content_type='application/json')

    # add song and composer
    if songTitle is not None:
      songTitle = json.loads(songTitle)
      composerName = json.loads(composerName)
      songStyle = json.loads(songStyle)
      songArr = []
      for s in songTitle :
        song = None
        if type(s['id']) is not int or forceCreateSong:
          print("new song")
          if forceCreateSong:
            song = Song(title=s['text'])
            song.save()
          else:
            song = Song(title=s['id'])
            song.save()
        else:
          song = Song.objects.get(pk=s['id'])

        # adding styles
        for ss in songStyle :
          style = SongStyle.objects.get(name=ss)
          song.styles.add(style)

        # adding the composers
        songDict = model_to_dict(song)
        for idx, c in enumerate(composerName) :
          composer = None
          if type(c['id']) is not int:
            print("new composer")
            composer = Composer(full_name=c['id'])
            composer.save()
          else:
            composer = Composer.objects.get(pk=c['id'])
          cs, cs_created = ComposerSong.objects.get_or_create(
            composer=composer, 
            song=song
          )
          if cs_created:
            print("new composer song association")
            cs.save()
          if idx == 0:
            songDict["composers"] = []
          songDict["composers"].append({
            "fields": model_to_dict(composer)
          })
        video.songs.add(song)
        songArr.append(songDict)

      import sys
      sys.stdout.flush()
      return HttpResponse(
          json.dumps(songArr), content_type='application/json')
  
  # not a post
  return HttpResponse(json.dumps("failure"), content_type='application/json')
