/** @jsx React.DOM */

/*
 * Requires properties: 
 * placeholder, querytype[song, composer, group], classname, name, type,
 * value
 */
var ReactTypeaheadInput =  React.createClass({
  getInitialState: function() {
    return {
      value: this.props.value,
      allowcreate: this.props.allowcreate,
    };
  },

  componentDidMount: function() {
    this.renderSelect2();
  },

  componentDidUpdate: function() {
    this.renderSelect2();
  },

  getData: function() {
    if (this.$select2)
      return this.$select2.select2('data')
    return null;
  },

  renderSelect2: function() {
    var select2 = React.renderComponent(
      this.transferPropsTo(
        <input 
          className={this.props.classname}
          name={this.props.name}
          type={this.props.type}
          value={this.state.value}
        />
      ),
      this.refs['select2'].getDOMNode()
    );
    this.$select2 = $(select2.getDOMNode());
    var that = this;
    this.$select2.select2({
      placeholder: that.props.placeholder,
      minimumInputLength: 1,
      multiple: true,
      width: "100%",
      ajax: that.props.ajax,
      createSearchChoice: function(term, data) { 
        if (!that.state.allowcreate) return null;
        if (
          $(data).filter(
            function() { 
              return this.text.localeCompare(term) === 0; 
            }
          ).length === 0
        ) {
          return {id:term, text:term + " *"};
        } 
      }
      //formatResult: that.formatResult,
      //formatSelection: that.formatSelection
    });
  },

  formatResult: function(data) {
    return "<p>" + data.text + "</p>";
  },

  formatSelection: function(data) {
    return data;
  },

  render: function() {
    return <div ref="select2" />;
  }
});
