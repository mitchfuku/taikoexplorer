/** @jsx React.DOM */

var Shield = React.createClass({displayName: 'Shield',
  setChildren: function(children) { 
    this.setState({children: children});
  }, 

  componentDidUpdate: function() {
    console.log(this.refs.shield.getDOMNode().children);
    if (this.refs.shield.getDOMNode().children.length) {
      $(this.refs.shield.getDOMNode().children[0]).remove();
    }
    this.renderShield(this.state.children);
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
