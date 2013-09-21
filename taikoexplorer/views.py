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
  return HttpResponse(json.dumps("hello"), content_type='application/json')

#serves the /video-data async requests
def editVideoData(request):
  if request.method == 'POST':
    vid = request.POST.get("vid")
    vtitle = request.POST.get("vtitle")
    vdesc = request.POST.get("vdesc")
    dthumb = request.POST.get("dthumb")
    groupName = request.POST.get("group_name", "")
    songTitle = request.POST.get("song_title", "")
    composerName = request.POST.get("composer_name", "")
    isOpenSource = request.POST.get("is_open_source", False)
    isDrill = request.POST.get("is_drill", False)
    isCopyrighted = request.POST.get("is_copyrighted", False)
    # not doing any is* yet....just name and title

    video, video_created = Video.objects.get_or_create(
      vid=vid, 
      title=vtitle,
      description=vdesc,
      default_thumb_url=dthumb)

    if composerName :
      composer, composer_created = Composer.objects.get_or_create(
        full_name=composerName)
    if songTitle :
      song, song_created = Song.objects.get_or_create(
        title=songTitle)
    if groupName :
      group, group_created = Group.objects.get_or_create(
        name=groupName)
    if (video_created or \
      song_created or \
      composer_created or \
      song.composers.get(full_name=composerName)) and \
      composer :
        song.composers.add(composer)
    if (video_created or \
      song_created or \
      video.songs.get(title=songTitle)) and \
      song :
        video.songs.add(song)
    if (video_created or \
      group_created or \
      video.groups.get(name=groupName)) and \
      group :
        video.groups.add(group)
    import sys
    sys.stdout.flush()
    return HttpResponse(json.dumps("success"), content_type='application/json')

def createNewSong(songTitle):
  song = Song(
      title=songTitle)
  return song

