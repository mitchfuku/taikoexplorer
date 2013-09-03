function SearchResultDisplayer(params) {
  this.resultContainer = params.resultContainer;
}

SearchResultDisplayer.prototype = {
  display: function(data) {
    console.log(data);
    for (var i = 0; i < data.items.length; i++) {
      var vid = data.items[i];
      this.resultContainer.append(
        '<div class="row search-result"> \
          <div class="col-md-4 video-thumb"> \
            <img src="' + vid.snippet.thumbnails.medium.url + '" /> \
          </div> \
          <div class="col-md-8 video-details"> \
            <p class="title"> \
              <a href="https://www.youtube.com/watch?v='
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
        </div>'
      );
    }
  },
  clearResults: function() {
    this.resultContainer.empty();
  }
}
