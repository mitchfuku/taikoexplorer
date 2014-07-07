/** @jsx React.DOM */

var ReactHoverHint = React.createClass({displayName: 'ReactHoverHint',
  render: function() {
    return this.transferPropsTo(
      React.DOM.div( {className:"reactHoverHint"}, 
        React.DOM.span( {className:"glyphicon glyphicon-question-sign"} ),
        React.DOM.div( 
          {className:"hintBox",
          style:{"width" : this.props.hintWidth}}, 
          this.props.hintText,
          React.DOM.div( {className:"arrow-down"})
        )
      )
    );
  }
});
