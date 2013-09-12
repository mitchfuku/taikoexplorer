from django.shortcuts import render, render_to_response, redirect
from django.http import HttpResponse
from django.template import RequestContext
from taikoexplorer_db.models import Tag
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
      songVideo = SongVideo.objects.filter(
          video_vid__in=searchResults.get("vids", None)).values_list(
              'song_id', flat=True)
      groupvideo = groupvideo.objects.select_related.filter(
          video_vid__in=searchResults.get("vids", None))
      composerSong = ComposerSong.objects.select_related.filter(
          song_id__in=songVideo)
      print(songVideo)
      print(groupVideo)
      print(composerSong)
      dataDict = {}
      for group in groupVideo:
        dataDict[group.video_vid] = group
      import sys
      sys.stdout.flush()
      # iterate through tags and create a map with the vid as the key
      data = {
        "videos" : searchResults,
        "tags" : tagDict,
        "query" : query,
        "pageToken" : request.GET.get("pageToken", "")
      }
      return render(request, 'search-results.html', {"data" : data})

  # if all else fails, show landing page
  return render(request, 'index.html')

# serves the /yts api
def youtubeSearch(request):
  options = dict({
    "q" : request.GET.get("query", None),
    "maxResults" : request.GET.get("maxResults", 10),
    "pageToken" : request.GET.get("pageToken", "")
  })
  youtubeResults = youtube.youtube_search(options)
  tags = Tag.objects.filter(vid__in=youtubeResults.get("vids", None))
  data = {
    "video" : youtubeResults,
    "db" : list(tags)
  }
  return HttpResponse(json.dumps(data), content_type='application/json')

#serves the /video-data async requests
def editVideoData(request):
  if request.method == 'POST':
    vid = request.POST.get("vid")
    groupName = request.POST.get("group_name", "")
    import sys
    sys.stdout.flush()
    songTitle = request.POST.get("song_title", "")
    composer = request.POST.get("composer", "")
    print(composer)
    isOpenSource = request.POST.get("is_open_source", False)
    isDrill = request.POST.get("is_drill", False)
    isCopyrighted = request.POST.get("is_copyrighted", False)
    # not doing any is* yet....just name and title
    try:
      tag = Tag.objects.get(vid=vid)
      tag.composer = composer
      tag.group = groupName
      tag.song_title=songTitle
    except Tag.DoesNotExist:
      tag = Tag(
          vid=vid, composer=composer, group=groupName, song_title=songTitle)
    tag.save()
    return HttpResponse(json.dumps("success"), content_type='application/json')

