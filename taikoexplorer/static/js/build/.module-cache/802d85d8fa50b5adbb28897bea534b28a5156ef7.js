/** @jsx React.DOM */

var Shield = React.createClass({displayName: 'Shield',
  getInitialState: function() {
    return (
      {
        children: this.props.children,
      }
    );
  },

  setChildren: function(children) {
    console.log(children);
    this.setState({children: children});
  },

  show: function() {
    $('#shield').fadeIn(200);
  },

  hide: function() {
    $('#shield').fadeOut(200);
  },

  render: function() {
    return (
      React.DOM.div( {id:"shield"}, 
        this.state.children
      )
    );
  }
});
