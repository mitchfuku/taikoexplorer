from django.shortcuts import render, render_to_response, redirect
from django.http import HttpResponse
from taikoexplorer_db.models import Tag
import json
import settings as templates_settings
import youtube

# serve the / directory
def home(request):
  return render(request, 'index.html')

#serves the /video directory
def video(request):
  context = {}
  context['vid'] = request.GET.get("v", None)
  return render(request, 'video.html', context)

def youtubeSearch(request):
  options = dict({
    "q" : request.GET.get("query", None),
    "maxResults" : request.GET.get("maxResults", 25)
  })
  return HttpResponse(json.dumps(youtube.youtube_search(options)),
      content_type='application/json')
