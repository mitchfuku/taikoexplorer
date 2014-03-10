from django.http import HttpResponse
from django.template import RequestContext
from taikoexplorer_db.models import Video, Composer, Song, Group, SongStyle, ComposerSong, VideoSong, VideoGroup
from django.core import serializers
from django.forms.models import model_to_dict
from django.db.models import Count

import youtube, json, sys

#serves the /add-video-data async requests
def editVideoData(request):
  print("edit video data")
  if request.method == 'POST':
    vid = request.POST.get("vid")
    vtitle = request.POST.get("vtitle", None)
    vdesc = request.POST.get("vdesc", None)
    dthumb = request.POST.get("dthumb", None)
    mthumb = request.POST.get("mthumb", None)
    cid = request.POST.get("cid", None)
    ctitle = request.POST.get("ctitle", None)
    groupName = request.POST.get("group_name", None)
    songData = request.POST.get("song_title", None)
    composerName = request.POST.get("composer_name", None)
    songStyle = request.POST.get("song_style", None)
    forceCreateSong = json.loads(
      request.POST.get("force_create_song", False)
    )

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

    if groupName is None and songData is None and composerName is None:
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
        videoGroup, vg_created = VideoGroup.objects.get_or_create(
          video=video,
          group=group
        )
        if vg_created:
          print("new video group association")
          videoGroup.save()

        groupArr.append(model_to_dict(group))
      return HttpResponse(
          json.dumps(groupArr), content_type='application/json')

    # add song and composer
    # must have a song title and a song style
    if songData is not None and songStyle is not None:
      songData = json.loads(songData)
      composerName = json.loads(composerName)
      songStyle = json.loads(songStyle)

      song = None
      if type(songData['id']) is not int or forceCreateSong is True:
        # force create is disgusting and expensive as fuck
        # since we query for all the songs first, we should probably store that
        # info somewhere and check it again before assuming the user is a jerk
        if forceCreateSong is True:
          print("force create")
          composerIDs = []
          for c in composerName:
            composerIDs.append(c['id'])
          styles = SongStyle.objects.filter(name__in=songStyle)
          composers = Composer.objects.filter(id__in=composerIDs)
          try:
            # Good lord this query looks like shit...necessary though 
            # http://stackoverflow.com/questions/8618068/django-filter-queryset-in-for-every-item-in-list
            # If the user forces a create, we need to check if the song they
            # eventually enter is actually a real song.  Only triggered if 
            # the user is actually kind of a jackass.

            # still stupid that we have to do this...it'll work for now
            songs = Song.objects.filter(
              title=songData['text']
            ).filter(
              styles__in=styles
            ).annotate(
              num_styles=Count('styles', distinct=True)
            ).filter(
              num_styles=len(styles)
            ).filter(
              composers__in=composers
            ).annotate(
              num_composers=Count('composers', distinct=True)
            ).filter(
              num_composers=len(composers)
            )
            # there should only be one.  this assumes that there would never be 
            # more than two songs titled the same thing with the same styles
            # and the same composers
            # if there's not...well we're fucked :P
            song = list(songs[:1])[0]

          except Song.DoesNotExist:
            song = Song(title=songData['text'])
            print("new song")
            song.save()
        else:
          song = Song(title=songData['id'])
          print("new song")
          song.save()
      else:
        song = Song.objects.get(pk=songData['id'])

      songDict = model_to_dict(song)
      # adding styles
      for idx, ss in enumerate(songStyle):
        style = SongStyle.objects.get(name=ss)
        song.styles.add(style)
        if idx == 0:
          songDict["styles"] = []
        songDict["styles"].append({
          "fields": model_to_dict(style)
        })

      # adding the composers
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
      videoSong, vs_created = VideoSong.objects.get_or_create(
        video=video,
        song=song
      )
      if vs_created:
        print("new video song association")
        videoSong.save()

      sys.stdout.flush()
      return HttpResponse(
          json.dumps(songDict), content_type='application/json')
  
  # not a post
  return HttpResponse(json.dumps("failure"), content_type='application/json')

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

def youtubeSearchResults(getrequest, results = 10):
  if results <= 0:
    return None
  options = dict({
    "q" : getrequest.get("query", None),
    "maxResults" : getrequest.get("maxResults", results),
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
      song["fields"]["styles"] = json.loads(
        serializers.serialize(
          "json",
          video.songs.all()[idx].styles.all()
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

# serves the /yts api
def youtubeSearch(request):
  query = request.GET.get("q", None)
  query_type = request.GET.get("type", None)
  vid = request.GET.get("vid", None)
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
          entry["already_tagged"] = False

          if vid is not None:
            # whether or not the song is already tagged in the specified video
            for video in entry["videos"]:
              if video["fields"]["vid"] == vid:
                entry["already_tagged"] = True

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
