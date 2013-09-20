/** @jsx React.DOM */

var SearchResultContainer = React.createClass({displayName: 'SearchResultContainer',
  render: function() {
    console.log(this.props.data);
    var searchResultNodes = this.props.data.video.items.map(function(video) {
      return SearchResult(null )
    });
    return (
      React.DOM.div( {className:"row search-result"},  
        searchResultNodes
      )
    );
  }
});
