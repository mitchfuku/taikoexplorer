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
      console.log(children);
      console.log(this);
      var c = React.renderComponent(
        this.transferPropsTo(children.props.children),
        this.refs.shield.getDOMNode()
      );
      console.log(c);
    }
  },

  render: function() {
    return React.DOM.div( {id:"shield", ref:"shield"} );
  }
});
