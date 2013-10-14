/** @jsx React.DOM */

var SearchResultsPager = React.createClass({displayName: 'SearchResultsPager',
  genRenderButton: function(token, isNextButton) {
    var cl = "previous";
    var label = "\u2190 Previous";

    if (isNextButton) {
      label = "Next \u2192";
      cl = "next";
    }

    if (token) {
      return (
        React.DOM.li( {className:cl}, 
          React.DOM.a( {href:"/?query=" + this.props.query 
            + "&pageToken=" + token
            + "&type=" + this.props.type}, 
              label
          )
        )
      );
    } else {
      return (
        React.DOM.li( {className:cl + " disabled"}, 
          React.DOM.a(null, label)
        )
      );
    }
  },

  render: function() {
    var nextToken = this.props.nextpagetoken;
    var prevToken = this.props.prevpagetoken;
    return (
      React.DOM.ul( {className:"pager"}, 
        this.genRenderButton(prevToken, false),
        this.genRenderButton(nextToken, true)
      )
    );

  }
});
