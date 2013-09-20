/** @jsx React.DOM */

var SearchResultContainer = React.createClass({displayName: 'SearchResultContainer',
  render: function() {
    console.log(this.props.data);
    var searchResultNodes = this.props.data.videos.items.map(function(video) {
      return (
        SearchResult(
          {videodata:video,
          metadata:this.props.data.metadata[video.vid.id.videoId]}
        )
      );
    }.bind(this));
    return (
      React.DOM.div( {className:"row search-result"},  
        searchResultNodes
      )
    );
  }
});
