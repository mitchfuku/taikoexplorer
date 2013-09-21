/** @jsx React.DOM */

var SearchResultsPager = React.createClass({displayName: 'SearchResultsPager',
  genRenderButton: function(query, token, isNext) {
    var label = String.fromCharCode(37) + " Previous";
    if (isNext) {
      label = "Next " + String.fromCharCode(39);
    }
    if (token) {
      return (
        React.DOM.li( {className:"previous"}, 
          React.DOM.a( 
            {href:"/?query=" + query + "&pageToken=" + token}, 
              label
          )
        )
      );
    } else {
      return (
        React.DOM.li( {className:"previous disabled"}, 
          React.DOM.a(null, label)
        )
      );
    }
  },

  render: function() {
    var query = this.props.query;
    var nextToken = this.props.nextpagetoken;
    var prevToken = this.props.prevpagetoken;
    return (
      React.DOM.ul( {className:"pager"}, 
        this.genRenderButton(query, prevToken, false),
        this.genRenderButton(query, nextToken, true)
      )
    );

  }
});
