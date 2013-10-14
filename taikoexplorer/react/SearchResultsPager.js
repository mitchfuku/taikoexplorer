/** @jsx React.DOM */

var SearchResultsPager = React.createClass({
  genRenderButton: function(token, isNextButton) {
    var cl = "previous";
    var label = "\u2190 Previous";

    if (isNextButton) {
      label = "Next \u2192";
      cl = "next";
    }

    if (token) {
      return (
        <li className={cl}>
          <a href={"/?query=" + this.props.query 
            + "&pageToken=" + token
            + "&type=" + this.props.type}>
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
    var nextToken = this.props.nextpagetoken;
    var prevToken = this.props.prevpagetoken;
    return (
      <ul className="pager">
        {this.genRenderButton(prevToken, false)}
        {this.genRenderButton(nextToken, true)}
      </ul>
    );

  }
});
