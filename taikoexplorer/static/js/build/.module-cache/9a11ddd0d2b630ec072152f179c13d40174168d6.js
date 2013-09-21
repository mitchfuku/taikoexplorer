/** @jsx React.DOM */

var SearchResultsPager = React.createClass({displayName: 'SearchResultsPager',
  genRenderButton: function(query, token, isNext) {
    var label = "blah";
    var cl = "previous";
    var label = "\u2190 Previous";

    if (isNext) {
      label = "Next \u2192";
      cl = "next";
    }

    if (token) {
      return (
        React.DOM.li( {className:cl}, 
          React.DOM.a( {href:"/?query=" + query + "&pageToken=" + token}, 
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
    console.log(this.props);
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
