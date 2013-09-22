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
              csrftoken:this.props.csrftoken,
              shield:this.props.shield}
            )
          )
        );
      }.bind(this)
    );
    return (
      React.DOM.div( {id:"search-results"}, 
        searchResultNodes
      )
    );
  }
});
