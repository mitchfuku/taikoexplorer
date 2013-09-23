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

  allowMultiple: function() {
    var t = this.props.type;
    switch (t) {
      case "group":
      case "composer":
        return true;
      case "song":
        return false;
    }
    return null;
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
    var allowMultiple = this.allowMultiple();
    $el.select2({
      placeholder: that.props.placeholder,
      createSearchChoice: function(term, data) { 
        if (
          $(data).filter(
            function() { 
              return this.text.localeCompare(term) === 0; 
            }
          ).length === 0
        ) {
          return {id:term, text:term};
        } 
      },
      minimumInputLength: 1,
      multiple: allowMultiple,
      width: "100%",
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
          if (data) data["query_type"] = that.props.querytype
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
