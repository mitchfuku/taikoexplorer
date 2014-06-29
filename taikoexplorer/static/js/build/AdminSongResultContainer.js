/** @jsx React.DOM */

var AdminSongResultContainer = React.createClass({displayName: 'AdminSongResultContainer',
  render: function() {
    var searchResultNodes = this.props.videoItems.map(
      function(video, index) {
        return (
          React.DOM.div( {className:"row search-result"},  
            SearchResult(
              {videodata:video,
              metadata:this.props.videoMetadata[video.id.videoId],
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
