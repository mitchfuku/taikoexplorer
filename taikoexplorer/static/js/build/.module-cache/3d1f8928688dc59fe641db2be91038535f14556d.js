/** @jsx React.DOM */

var SearchResultContainer = React.createClass({displayName: 'SearchResultContainer',
  render: function() {
    return this.props.data.videos.items.map(function(video) {
      return (
        React.DOM.div( {className:"row search-result"} 
        )
      );
    }.bind(this));
  }
});
