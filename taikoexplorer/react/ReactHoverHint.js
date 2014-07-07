/** @jsx React.DOM */

var ReactHoverHint = React.createClass({
  render: function() {
    return this.transferPropsTo(
      <div className="reactHoverHint">
        <span className="glyphicon glyphicon-question-sign" />
        <div 
          className="hintBox"
          style={{"width" : this.props.hintWidth}}>
          {this.props.hintText}
          <div className="arrow-down"></div>
        </div>
      </div>
    );
  }
});
