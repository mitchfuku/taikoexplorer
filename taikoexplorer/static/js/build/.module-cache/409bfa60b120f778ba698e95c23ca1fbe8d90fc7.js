/** @jsx React.DOM */

var ReactInput =  React.createClass({displayName: 'ReactInput',
  getInitialState: function() {
    return {value: this.props.value}
  },

  onChange: function() {
    this.setState({value: e.target.value});
  },

  render: function() {
    return (
      React.DOM.input(
        {className:this.props.classname,
        name:this.props.name,
        onChange:this.onChange,
        placeholder:this.props.placeholder,
        type:this.props.type,
        value:this.state.value}
      ) 
    );
  }

});
