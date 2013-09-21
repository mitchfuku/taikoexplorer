/** @jsx React.DOM */

var Shield = React.createClass({
  getInitialState: function() {
    return (
      {
        children: this.props.children,
      }
    );
  },

  setChildren: function(children) {
    this.setState({children: children});
  },

  show: function() {
    $('#shield').show(200);
  },

  hide: function() {
    $('#shield').hide(200);
  },

  render: function() {
    return (
      <div id="shield">
        {this.state.children}
      </div>
    );
  }
});
