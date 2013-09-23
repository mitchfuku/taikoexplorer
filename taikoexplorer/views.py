from django.shortcuts import render, render_to_response, redirect
from django.http import HttpResponse
from django.template import RequestContext
from taikoexplorer_db.models import Video, Composer, Song, Group
from django.forms.models import model_to_dict
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
          "groups" : list(video.groups.all()),
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
  if query is not None and query_type is not None:
    model = type_dict[query_type]
    if query_type == 'composer':
      try:
        data = model.objects.get(full_name__icontains=query)[:5]
      except Composer.DoesNotExist:
        data = []
    elif query_type == 'group':
      try:
        data = model.objects.get(name__icontains=query)[:5]
      except Group.DoesNotExist:
        data = []
    elif query_type == 'song':
      try: 
        data = model.objects.get(title__icontains=query)[:5]
      except Song.DoesNotExist:
        data = []

  return HttpResponse(
      json.dumps(data), content_type='application/json')

#serves the /add-video-data async requests
def editVideoData(request):
  if request.method == 'POST':
    vid = request.POST.get("vid")
    vtitle = request.POST.get("vtitle")
    vdesc = request.POST.get("vdesc")
    dthumb = request.POST.get("dthumb")
    groupName = request.POST.get("group_name", None)
    songTitle = request.POST.get("song_title", None)
    composerName = request.POST.get("composer_name", None)
    #isOpenSource = request.POST.get("is_open_source", False)
    #isDrill = request.POST.get("is_drill", False)
    #isCopyrighted = request.POST.get("is_copyrighted", False)
    # not doing any is* yet....just name and title

    print(songTitle)
    print(groupName)
    print(composerName)
    #video, video_created = Video.objects.get_or_create(
      #vid=vid, 
      #title=vtitle,
      #description=vdesc,
      #default_thumb_url=dthumb)

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
    import sys
    sys.stdout.flush()
    return HttpResponse(json.dumps("success"), content_type='application/json')

def createNewSong(songTitle):
  song = Song(
      title=songTitle)
  return song

