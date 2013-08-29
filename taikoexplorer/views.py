from django.shortcuts import render, render_to_response, redirect
import settings as templates_settings
import youtube

# serve the / directory
def home(request):
  return render(request, 'index.html')

def youtube():
  youtube.youtube_search("test")
