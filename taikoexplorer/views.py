from django.shortcuts import render, render_to_response, redirect
from django.http import HttpResponse, HttpResponseRedirect
from django.template import RequestContext
from django.core import serializers
from taikoexplorer_db.models import Video, Composer, Song, Group, SongStyle, ComposerSong
import json

from data import dbSearchResults, youtubeSearchResults, rekeyAndFormatVideoData, formattedVideoData
from forms import AdminLoginForm

from django.views.decorators.csrf import ensure_csrf_cookie

ADMIN_COOKIE = 'is_logged_in_admin'
ADMIN_COOKIE_EXPIRE = 1800 #seconds
ADMIN_PASSWORD = 'TaikoEx14'

@ensure_csrf_cookie

# serve the /advanced-search directory
def advancedSearch(request):
  return render(request, 'advanced-search.html')

# gets the proper data based on the request type
# index 0 - video data results
# index 1 - db metadata results
def searchRouter(getrequest):
  query = getrequest.get("query", None)
  type = getrequest.get("type", None)

  if type == "db":
    # search only db
    return dbSearchResults(query)
  elif type == "ytdb":
    # search both
    dbResults = dbSearchResults(query)
    print(dbResults[0])
    ytResults = youtubeSearchResults(getrequest)
    dbResultsKeySet = set([i['id']['videoId'] for i in dbResults[0]["items"]])
    videos = list(dbResults[0]["items"])
    for video in ytResults[0]["items"]:
      if video['id']['videoId'] not in dbResultsKeySet:
        videos.append(video)

    fuck = [
      {'items':videos},
      list(set(dbResults[1]) | set(ytResults[1]))
    ]
    print(fuck)
    return fuck
  elif type == "yt":
    # search only youtube
    return youtubeSearchResults(getrequest)

  # default to searching db and if no results, searching youtube
  dbResults = dbSearchResults(query)
  if len(dbResults[0]["items"]) == 0:
    getrequest.type = "yt"
    return youtubeSearchResults(getrequest)
  else:
    getrequest.type = "db"
    return dbResults

# serve the / directory
def home(request):
  query = request.GET.get("query", None)
  if request.method == 'GET':
    if query is not None :
      searchData = searchRouter(request.GET)
      searchResults = searchData[0]
      metadata = searchData[1]

      return render(
        request,
        'search-results.html',
        {"data" : json.dumps({
          "videos" : searchResults,
          "metadata" : rekeyAndFormatVideoData(metadata),
          "query" : query,
          "pageToken" : request.GET.get("pageToken", "")
        })}
      )

  # if no query param, show landing page
  return render(request, 'index.html')

# serve the /songs directory
def songs(request):
  return render(
    request, 
    'song-list.html',
    {"data": Song.objects.values('title', 'videos__medium_thumb_url').order_by('title').distinct('title').all()}
  )

# serve the /composers directory
def composers(request):
  return render(
    request, 
    'composer-list.html',
    {"data": Composer.objects.values('full_name').order_by('full_name').all()}
  )

# serve the /groups directory
def groups(request):
  return render(
    request, 
    'group-list.html',
    {"data": Group.objects.values('name').order_by('name').all()}
  )

# serve the /admin directory
def admin(request):
  #unconfirmedSongs = Song.objects.exclude(is_confirmed=True).order_by('title').all()
  #confirmedSongs = Song.objects.exclude(is_confirmed=False).order_by('title').all()
  unconfirmedSongVideos = Video.objects.filter(
    songs__is_confirmed__exact=False
  ).prefetch_related(
    'songs', 'songs__composers', 'songs__styles', 'groups'
  ).order_by('title')
  confirmedSongVideos = Video.objects.filter(
    songs__is_confirmed__exact=True
  ).order_by('title')

  formattedUnconfirmedVideos = []
  for video in unconfirmedSongVideos :
    formattedUnconfirmedVideos.append(formattedVideoData(video))

  response = render(
    request, 
    'unconfirmed-list.html',
    {"data": json.dumps({
      "unconfirmed_songs": {
        "videos" : {
          "items" : formattedUnconfirmedVideos,
          "metadata" : rekeyAndFormatVideoData(unconfirmedSongVideos),
        },
      },
    })}
  )

  if request.COOKIES.get(ADMIN_COOKIE, False):
    return response
  elif request.method == 'POST':
    form = AdminLoginForm(request.POST)
    if form.is_valid():
      if form.cleaned_data['password'] == ADMIN_PASSWORD:
        response.set_cookie(
          key=ADMIN_COOKIE, 
          value=True, 
          max_age=ADMIN_COOKIE_EXPIRE
        )
        return response
  else:
    form = AdminLoginForm()

  return render(request, 'admin-login.html', {'form': form})

