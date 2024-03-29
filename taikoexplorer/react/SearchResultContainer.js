/** @jsx React.DOM */

var SearchResultContainer = React.createClass({
  render: function() {
    var searchResultNodes = this.props.data.videos.items.map(
      function(video, index) {
        return (
          <div className="row search-result"> 
            <SearchResult
              videodata={video}
              metadata={this.props.data.metadata[video.id.videoId]}
              index={index}
              isadmin={false}
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
