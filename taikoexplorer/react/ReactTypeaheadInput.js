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
    if (!this.props.outputformat) {
      this.props.outputformat = this.formatResult;
    }
    var that = this;
    this.$select2.select2({
      placeholder: that.props.placeholder,
      minimumInputLength: 1,
      multiple: that.props.multiple,
      width: "100%",
      ajax: that.props.ajax,
      sortResults: function(results, container, query) {
        var createdChoice = results.shift();
        results.push(createdChoice);
        return results;
      },
      createSearchChoice: function(term, data) { 
        if (!that.state.allowcreate) return null;
        //Comment out this if statement if you want to allow creating
        //even if the title is found
        //if (
          //$(data).filter(
            //function() { 
              //return this.text.localeCompare(term) === 0; 
            //}
          //).length === 0
        //) {
          return {id:term, text:term + " *"};
        //} 
      },
      formatResult: that.props.outputformat
      //formatSelection: that.formatSelection
    });
    if (this.props.selectinghandler) {
      this.$select2.on("select2-selecting", this.props.selectinghandler);
    }
    if (this.props.focus) {
      this.$select2.select2("focus");
    }
  },

  formatResult: function(result, container, query, escapeMarkup) { 
    var markup=[]; 
    window.Select2.util.markMatch(
      result.text, 
      query.term, 
      markup, 
      escapeMarkup
    ); 
    return markup.join(""); 
  },

  formatSelection: function(data) {
    return data;
  },

  render: function() {
    return <div ref="select2" />;
  }
});
