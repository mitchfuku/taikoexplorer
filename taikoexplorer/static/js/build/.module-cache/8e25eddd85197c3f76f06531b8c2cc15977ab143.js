/** @jsx React.DOM */

var SearchResult = React.createClass({displayName: 'SearchResult',
  render: function() {
    console.log(this.props);
    return (
      React.DOM.div(null, "hello")
    );
  }
});
