/** @jsx React.DOM */

var SearchResultContainer = React.createClass({displayName: 'SearchResultContainer',
  render: function() {
    var searchResultNodes = this.props.data.videos.items.map(function(video) {
      return (
          SearchResult(
            {videodata:video,
            metadata:this.props.data.metadata[video.id.videoId]}
          )
      );
    }.bind(this));
    return (
      React.DOM.div(null, 
        searchResultNodes
      )
    );
  }
});
