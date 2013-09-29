from django.shortcuts import render, render_to_response, redirect
from django.http import HttpResponse
from django.template import RequestContext
from taikoexplorer_db.models import Video, Composer, Song, Group
from django.forms.models import model_to_dict
from django.core import serializers
import json
import settings as templates_settings
import youtube

# serve the / directory
def home(request):
  if request.method == 'GET':
    query = request.GET.get("query", None)
    if query is not None :
      options = dict({
        "q" : query,
        "maxResults" : request.GET.get("maxResults", 10),
        "pageToken" : request.GET.get("pageToken", "")
      })
      searchResults = youtube.youtube_search(options)
      
      videos = Video.objects.filter(
          vid__in=searchResults.get("vids", None)).prefetch_related(
          'songs__composers', 'groups')
      dataDict = {}
      for video in videos :
        dataDict[video.vid] = {
          "video-data" : model_to_dict(video),
          "groups" : json.loads(serializers.serialize("json", video.groups.all())),
          "songs" : list(video.songs.all()),
          "composers" : list(Composer.objects.filter(
            songs__in=video.songs.all()
          ).all())
        }
      # iterate through tags and create a map with the vid as the key
      data = {
        "videos" : searchResults,
        "metadata" : dataDict,
        "query" : query,
        "pageToken" : request.GET.get("pageToken", "")
      }
      import sys
      sys.stdout.flush()
      return render(
        request,
        'search-results.html',
        {"data" : json.dumps(data)}
      )

  # if all else fails, show landing page
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
        d = model.objects.filter(full_name__icontains=query)
        data.append(model_to_dict(d))
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
        d = model.objects.get(title=query)
        data.append(model_to_dict(d))
      except Song.DoesNotExist:
        data = []
    import sys
    if data:
      for entry in data:
        entry = model_to_dict(entry)
        sys.stdout.flush()
        if query_type == 'composer':
          entry["text"] = entry["full_name"]
        elif query_type == 'group':
          entry["text"] = entry["name"]
        elif query_type == 'song':
          entry["text"] = entry["title"]
        returnData.append(entry)

  return HttpResponse(
      json.dumps(returnData), content_type='application/json')

#serves the /add-video-data async requests
def editVideoData(request):
  if request.method == 'POST':
    vid = request.POST.get("vid")
    vtitle = request.POST.get("vtitle", None)
    vdesc = request.POST.get("vdesc", None)
    dthumb = request.POST.get("dthumb", None)
    groupName = request.POST.get("group_name", None)
    songTitle = request.POST.get("song_title", None)
    composerName = request.POST.get("composer_name", None)
    video = None
    print (groupName)
    if vtitle is None and vdesc is None and dthumb is None:
      video = Video.objects.get(vid=vid)
    else:
      video = Video(
        vid=vid, 
        title=vtitle,
        description=vdesc,
        default_thumb_url=dthumb)
      video.save()

    if groupName is None and songTitle is None and composerName is None:
      raise Exception("No data was provided")

    if groupName is not None:
      # add group
      groupName = json.loads(groupName)
      groupArr = []
      for g in groupName :
        group = None
        if type(g['id']) is not int: 
          print("new group")
          group = Group(name=g['id'])
          group.save()
        else:
          print("old group")
          group = Group.objects.get(pk=g['id'])
        video.groups.add(group)
        groupArr.append(model_to_dict(group))
      return HttpResponse(
          json.dumps(groupArr), content_type='application/json')

    import sys
    sys.stdout.flush()
    #if songTitle is not None:
      #songTitle = json.loads(songTitle)
      #if composerName is not None:
        #composerName = json.loads(composerName)

    #isOpenSource = request.POST.get("is_open_source", False)
    #isDrill = request.POST.get("is_drill", False)
    #isCopyrighted = request.POST.get("is_copyrighted", False)
    # not doing any is* yet....just name and title

    print(songTitle)
    print(groupName)
    print(composerName)

    #if composerName :
      #composer, composer_created = Composer.objects.get_or_create(
        #full_name=composerName)
    #if songTitle :
      #song, song_created = Song.objects.get_or_create(
        #title=songTitle)
    #if groupName :
      #group, group_created = Group.objects.get_or_create(
        #name=groupName)
    #if composer :
        #song.composers.add(composer)
    #if song :
        #video.songs.add(song)
    #if group :
        #video.groups.add(group)
    return HttpResponse(json.dumps("success"), content_type='application/json')
  return HttpResponse(json.dumps("failure"), content_type='application/json')

def createNewSong(songTitle):
  song = Song(
      title=songTitle)
  return song

