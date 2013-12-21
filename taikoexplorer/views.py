from django.shortcuts import render, render_to_response, redirect
from django.http import HttpResponse
from django.template import RequestContext
from taikoexplorer_db.models import Video, Composer, Song, Group, SongStyle, ComposerSong
import json

from data import dbSearchResults, youtubeSearchResults, rekeyAndFormatVideoData

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
    return None
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
  request.session["query"] = query
  # session expires in 24 hours
  request.session.set_expiry(86400)
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
