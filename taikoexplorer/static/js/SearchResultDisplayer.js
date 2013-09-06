function SearchResultDisplayer(params) {
  this.resultContainer = params.resultContainer;
}

SearchResultDisplayer.prototype = {
  display: function(data) {
    console.log(data);
    var videos = data.video;
    for (var i = 0; i < videos.items.length; i++) {
      var vid = videos.items[i];
      //The video itself
      this.resultContainer.append(
        '<div class="row search-result"> \
          <div class="col-md-4 video-thumb"> \
            <a href="/video?v='
            + vid.id.videoId + '"> \
              <img src="' + vid.snippet.thumbnails.medium.url + '" /> \
            </a> \
          </div> \
          <div class="col-md-8 video-details"> \
            <p class="title"> \
              <a href="/video?v='
              + vid.id.videoId + '"> \
                ' + vid.snippet.title + '</a> \
            </p> \
            <p class="info"> \
              by <a href="https://www.youtube.com/user/'
              + vid.snippet.channelTitle + '" target="_blank"> \
                ' + vid.snippet.channelTitle + '</a> \
            </p> \
            <p class="desc"> \
              ' + vid.snippet.description + '</p> \
          </div> \
          <div class="row"> \
            <div class="input-group"> \
              <span class="input-group-addon">@</span> \
              <input type="text" class="form-control" placeholder="Username"> \
            </div> \
          </div> \
        </div>'
      );
      this.resultContainer.append(
      );
    }
  },
  clearResults: function() {
    this.resultContainer.empty();
  }
}
