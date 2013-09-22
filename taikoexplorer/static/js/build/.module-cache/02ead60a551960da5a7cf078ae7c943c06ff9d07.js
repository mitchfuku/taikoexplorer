/** @jsx React.DOM */

var Shield = React.createClass({displayName: 'Shield',
  setChildren: function(children) { 
    this.renderShield(children);
  }, 

  show: function() {
    $('#shield').fadeIn(200);
  },

  hide: function() {
    $('#shield').fadeOut(200);
  },

  renderShield: function(children) {
    if (children) {
      React.renderComponent(
        this.transferPropsTo(children),
        this.refs.shield.getDOMNode()
      );
    }
  },

  render: function() {
    return React.DOM.div( {id:"shield", ref:"shield"} );
  }
});
