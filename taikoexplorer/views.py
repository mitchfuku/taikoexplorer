from django.shortcuts import render, render_to_response, redirect
from django.http import HttpResponse
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
      data = {
        "videos" : searchResults,
        "db" : list(tags)
      }
      return render_to_response('search-results.html', {"data" : data})

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
  print(tags)
  print(youtubeResults.get("vids", []))
  return HttpResponse(json.dumps(data), content_type='application/json')
