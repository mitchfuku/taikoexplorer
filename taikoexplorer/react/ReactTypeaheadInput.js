/** @jsx React.DOM */

/*
 * Requires properties: 
 * placeholder, querytype[song, composer, group], classname, name, type,
 * value
 */
var ReactTypeaheadInput =  React.createClass({
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
      multiple: true,
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
          var results = [];
          for (var i = 0; i < data.length; i++) {
            results.push({
              id: data[i].id,
              text: data[i].text
            });
          };
          return {results: results}
        }
      },
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
