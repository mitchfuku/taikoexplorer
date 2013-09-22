/** @jsx React.DOM */

var Shield = React.createClass({displayName: 'Shield',
  getInitialState: function() {
    return (
      {
        children: this.props.children,
      }
    );
  },

  componentDidMount: function() {
    this.renderShield();
  },

  componentDidUpdate: function() {
    this.renderShield();
  },

  setChildren: function(children) { 
    this.setState({children: children}); 
  }, 

  show: function() {
    $('#shield').fadeIn(200);
  },

  hide: function() {
    $('#shield').fadeOut(200);
  },

  renderShield: function() {
    React.renderComponent(
      this.state.children,
      this.refs['shield'].getDOMNode()
    );
  },

  render: function() {
    return (
      React.DOM.div( {id:"shield", ref:"shield"})
    );
  }
});
