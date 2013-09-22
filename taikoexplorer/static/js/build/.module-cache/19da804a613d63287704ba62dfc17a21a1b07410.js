/** @jsx React.DOM */

var Shield = React.createClass({displayName: 'Shield',
  getInitialState: function() {
    return (
      {
        children: this.props.children,
      }
    );
  },

  show: function() {
    $('#shield').show(200);
  },

  hide: function() {
    $('#shield').hide(200);
  },

  render: function() {
    return (
      React.DOM.div( 
        {id:"shield",
        display:"none"}, 
        this.state.children
      )
    );
  }
});
