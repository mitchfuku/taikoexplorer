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
    $el.select2({
      placeholder: this.props.placeholder,
      minimumInputLength: 1,
      ajax: {
        url: "yts", 
        dataType: "json",
        data: function(term) {
          return {
            q: term,
            type: this.props.querytype
          }
        },
        results: function(data) {
          data["query_type"] = this.props.querytype
          return {results: data}
        }
      },
      formatResult: this.formatResult,
      formatSelection: this.formatSelection
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
