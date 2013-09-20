/** @jsx React.DOM */

var SearchResultContainer = React.createClass({
  render: function() {
    var searchResultNodes = this.props.data.videos.items.map(function(video) {
      return (
        <div class="row search-result"> 
          <SearchResult
            videodata={video}
            metadata={this.props.data.metadata[video.id.videoId]}
          />
        </div>
      );
    }.bind(this));
    return (
      <div>
        {searchResultNodes}
      </div>
    );
  }
});
