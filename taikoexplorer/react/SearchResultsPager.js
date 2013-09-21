/** @jsx React.DOM */

var SearchResultsPager = React.createClass({
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
        <li className={cl}>
          <a href={"/?query=" + query + "&pageToken=" + token}>
              {label}
          </a>
        </li>
      );
    } else {
      return (
        <li className={cl + " disabled"}>
          <a>{label}</a>
        </li>
      );
    }
  },

  render: function() {
    var query = this.props.query;
    var nextToken = this.props.nextpagetoken;
    var prevToken = this.props.prevpagetoken;
    return (
      <ul className="pager">
        {this.genRenderButton(query, prevToken, false)}
        {this.genRenderButton(query, nextToken, true)}
      </ul>
    );

  }
});
