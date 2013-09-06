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
        "maxResults" : request.GET.get("maxResults", 10)
      })
      searchResults = youtube.youtube_search(options)
      tags = Tag.objects.filter(vid__in=searchResults.get("vids", None))
      # iterate through tags and create a map with the vid as the key
      data = {
        "videos" : searchResults,
        "tags" : list(tags)
      }
      return render(request, 'search-results.html', {"data" : data})

  # if all else fails, show landing page
  return render(request, 'index.html')

# serves the /yts api
def youtubeSearch(request):
  options = dict({
    "q" : request.GET.get("query", None),
    "maxResults" : request.GET.get("maxResults", 10)
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
    vid = request.POST.get("vid", None)
    groupName = request.POST.get("group_name", None)
    songTitle = request.POST.get("song_title", None)
    composer = request.POST.get("composer", None)
    isOpenSource = request.POST.get("is_open_source", False)
    isDrill = request.POST.get("is_drill", False)
    isCopyrighted = request.POST.get("is_copyrighted", False)
    # not doing any is* yet....just name and title
    try:
      tag = Tag.objects.get(vid=vid)
      tag.composer = composer
      tag.group = groupName
    except Tag.DoesNotExist:
      tag = Tag(vid=vid, composer=composer, group=groupName)
    tag.save()
    return HttpResponse(json.dumps("success"), content_type='application/json')
