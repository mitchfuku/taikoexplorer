#!/usr/bin/python

from apiclient.discovery import build
from optparse import OptionParser

# Set DEVELOPER_KEY to the "API key" value from the "Access" tab of the
# Google APIs Console http://code.google.com/apis/console#access
# Please ensure that you have enabled the YouTube Data API for your project.

DEVELOPER_KEY = "AIzaSyDZHEMie8fbaTQ6gw3uEdUZnp05qR-epHE"
YOUTUBE_API_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"

def youtube_search(options):
  youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION,
              developerKey=DEVELOPER_KEY)

  search_response = youtube.search().list(
                      q=options["q"],
                      type="video",
                      part="id,snippet",
                      maxResults=options["maxResults"],
                      pageToken=options["pageToken"]
                    ).execute()

  #videos = []
  #channels = []
  #playlists = []
  vIDs = []

  for search_result in search_response.get("items", []):
    if search_result["id"]["kind"] == "youtube#video":
      vIDs.append(search_result["id"]["videoId"])
      #returnResults.append(search_result)
      #videos.append("%s (%s)" % (search_result["snippet"]["title"],
        #search_result["id"]["videoId"]))
    #elif search_result["id"]["kind"] == "youtube#channel":
      #channels.append("%s (%s)" % (search_result["snippet"]["title"],
        #search_result["id"]["channelId"]))
    #elif search_result["id"]["kind"] == "youtube#playlist":
      #playlists.append("%s (%s)" % (search_result["snippet"]["title"],
        #search_result["id"]["playlistId"]))

  #print "Videos:\n", "\n".join(videos), "\n"
  #print "Channels:\n", "\n".join(channels), "\n"
  #print "Playlists:\n", "\n".join(playlists), "\n"

  search_response["vids"] = vIDs
  return search_response

# Running from shell example
if __name__ == "__main__":
  parser = OptionParser()
  parser.add_option("--q", dest="q", help="Search term", default="taiko")
  parser.add_option("--max-results", dest="maxResults",
    help="Max results", default=25)
  (options, args) = parser.parse_args()

  youtube_search(options)
