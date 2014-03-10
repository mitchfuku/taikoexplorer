from django.shortcuts import render, render_to_response, redirect
from django.http import HttpResponse
from django.template import RequestContext
from taikoexplorer_db.models import Video, Composer, Song, Group, SongStyle, ComposerSong
import json

from data import dbSearchResults, youtubeSearchResults, rekeyAndFormatVideoData

from django.views.decorators.csrf import ensure_csrf_cookie
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

      dataDict = rekeyAndFormatVideoData(metadata)

      data = {
        "videos" : searchResults,
        "metadata" : dataDict,
        "query" : query,
        "pageToken" : request.GET.get("pageToken", "")
      }

      return render(
        request,
        'search-results.html',
        {"data" : json.dumps(data)}
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
  return render(
    request, 
    'unconfirmed-list.html',
    {
      "data": {
        "songs": Song.objects.exclude(is_confirmed=True).order_by('title').all(),
      }
    }
  )
