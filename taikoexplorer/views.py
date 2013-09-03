from django.shortcuts import render, render_to_response, redirect
from django.http import HttpResponse
import json
import settings as templates_settings
import youtube

# serve the / directory
def home(request):
  return render(request, 'index.html')

def youtubeSearch(request):
  options = dict({
    "q" : request.GET.get("query", None),
    "maxResults" : request.GET.get("maxResults", 25)
  })
  return HttpResponse(json.dumps(youtube.youtube_search(options)),
      content_type='application/json')
