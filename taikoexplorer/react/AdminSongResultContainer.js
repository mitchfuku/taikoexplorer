/** @jsx React.DOM */

var AdminSongResultContainer = React.createClass({
  render: function() {
    var searchResultNodes = this.props.videoItems.map(
      function(video, index) {
        return (
          <div className="row search-result"> 
            <SearchResult
              videodata={video}
              metadata={this.props.videoMetadata[video.id.videoId]}
              index={index}
              csrftoken={this.props.csrftoken}
              shield={this.props.shield}
            />
          </div>
        );
      }.bind(this)
    );
    return (
      <div id="search-results">
        {searchResultNodes}
      </div>
    );
  }
});
