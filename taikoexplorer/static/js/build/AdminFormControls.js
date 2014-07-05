/** @jsx React.DOM */

var AdminFormControls = React.createClass({displayName: 'AdminFormControls',
  render: function() {
    return (
      React.DOM.div( {className:"row margin-top-12"}, 
        React.DOM.div( {className:"col-md-12 panel-group"}, 
          React.DOM.div( {className:"panel panel-info"}, 
            React.DOM.div( {className:"panel-heading"}, 
              React.DOM.h3( {className:"panel-title"}, "Admin Controls")
            ),
            React.DOM.div( {className:"panel-body"}, 
              "Put controls here"
            )
          )
        )
      )
    );
  }
});
