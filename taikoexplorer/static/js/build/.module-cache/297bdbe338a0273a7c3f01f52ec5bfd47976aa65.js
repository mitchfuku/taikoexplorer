/** @jsx React.DOM */

var SearchResultContainer = React.createClass({displayName: 'SearchResultContainer',
  render: function() {
    var searchResultNodes = this.props.data.videos.items.map(
      function(video, index) {
        return (
          React.DOM.div( {className:"row search-result"},  
            SearchResult(
              {videodata:video,
              metadata:this.props.data.metadata[video.id.videoId],
              index:index,
              csrftoken:this.props.csrftoken}
            )
          )
        );
      }.bind(this)
    );
    console.log(this.props);
    return (
      React.DOM.div(null, 
        searchResultNodes
      )
    );
  }
});
