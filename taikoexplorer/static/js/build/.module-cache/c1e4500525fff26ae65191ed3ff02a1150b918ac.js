/** @jsx React.DOM */

/*
 * Requires properties: 
 * placeholder, querytype[song, composer, group], classname, name, type,
 * value
 */
var ReactTypeaheadInput =  React.createClass({displayName: 'ReactTypeaheadInput',
  getInitialState: function() {
    return {
      value: this.props.value
    };
  },

  componentDidMount: function() {
    this.renderSelect2();
  },

  componentDidUpdate: function() {
    this.renderSelect2();
  },

  renderSelect2: function() {
    var select2 = React.renderComponent(
      this.transferPropsTo(
        React.DOM.input( 
          {className:this.props.classname,
          name:this.props.name,
          type:this.props.type,
          value:this.state.value}
        )
      ),
      this.refs['select2'].getDOMNode()
    );
    var $el = $(select2.getDOMNode());
    var that = this;
    $el.select2({
      placeholder: that.props.placeholder,
      minimumInputLength: 1,
      ajax: {
        url: "yts", 
        dataType: "json",
        data: function(term) {
          return {
            q: term,
            type: that.props.querytype
          }
        },
        results: function(data) {
          data["query_type"] = that.props.querytype
          return {results: data}
        }
      },
      //formatResult: that.formatResult,
      //formatSelection: that.formatSelection
    });
  },

  formatResult: function(data) {
    return data;
  },

  formatSelection: function(data) {
    return data;
  },

  render: function() {
    return React.DOM.div( {ref:"select2"} );
  }
});
