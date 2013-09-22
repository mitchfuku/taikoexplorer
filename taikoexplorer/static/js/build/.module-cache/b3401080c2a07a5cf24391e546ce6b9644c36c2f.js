/** @jsx React.DOM */

var SearchResultForm = React.createClass({displayName: 'SearchResultForm',
  genRenderHiddenFormInputs: function() {
    var metadata = this.props.metadata;
    var data = this.props.videodata;
    if (metadata) {
      return(
        React.DOM.div( {className:"hidden-form-inputs"}, 
          React.DOM.input( 
            {type:"hidden",
            value:data.snippet.description,
            name:"vdesc"}
          ),
          React.DOM.input(
            {type:"hidden",
            value:data.snippet.title,
            name:"vtitle"}
          ),
          React.DOM.input(
            {type:"hidden",
            value:data.snippet.thumbnails.default.url,
            name:"dthumb"}
          )
        )
      );
    }
    return null;
  },

  handleChange: function() {
    this.setState({value: this.refs.textarea.getDOMNode().value});
  },

  inputOnChange: function(e) {
    console.log(e);
    this.setState({value: e.target.getDOMNode().value});
  },

  render: function() {
    var metadata = this.props.metadata;
    var data = this.props.videodata;
    return(
      React.DOM.div( {className:"panel-group col-md-12", id:"accordion" + this.props.index}, 
        React.DOM.div( {className:"panel panel-default"}, 
          React.DOM.div( {className:"panel-heading"}, 
            React.DOM.h4( {className:"panel-title"}, 
              React.DOM.a( 
                {className:"accordion-toggle",
                'data-toggle':"collapse", 
                'data-parent':"#accordion" + this.props.index, 
                href:"#collapse" + this.props.index}, 
" Video Information "              )
            )
          ),
          React.DOM.div( 
            {id:"collapse" + this.props.index, 
            className:"panel-collapse collapse"}, 
            React.DOM.div( {className:"panel-body"}, 
              React.DOM.form( {id:"form-container"}, 
                React.DOM.input(
                  {type:"hidden",
                  value:data.id.videoId,l:true,
                  name:"vid"}
                ),
                React.DOM.input(
                  {type:"hidden",
                  value:this.props.csrftoken,
                  name:"csrfmiddlewaretoken"}
                ),
                this.genRenderHiddenFormInputs(),
                React.DOM.div( {className:"row"}, 
                  React.DOM.div( {className:"input-group col-md-6"},  
                    React.DOM.span( {className:"input-group-addon"}, "Song"), 
                    React.DOM.input(
                      {onChange:this.inputOnChange,
                      type:"text",
                      className:"form-control",
                      placeholder:"Enter Song Title",
                      name:"song_title",
                      value:""}
                    ) 
                  ), 
                  React.DOM.div( {className:"input-group col-md-6"},  
                    React.DOM.span( {className:"input-group-addon"}, "Composer"), 
                    React.DOM.input(
                      {type:"text",
                      className:"form-control",
                      placeholder:"Enter Composer Name",
                      name:"composer_name",
                      value:""}
                    ) 
                  ), 
                  React.DOM.button( {type:"submit", className:"btn btn-primary add-song"}, 
" Submit "                  )
                ),
                React.DOM.div( {className:"row"}, 
                  React.DOM.div( {className:"input-group col-md-6"},  
                    React.DOM.span( {className:"input-group-addon"}, "Group"), 
                    React.DOM.input( 
                      {type:"text",
                      className:"form-control",
                      placeholder:"Enter Group Name",
                      name:"group_name",
                      value:""}
                    )
                  ),
                  React.DOM.button( {type:"submit", className:"btn btn-primary"}, 
" Submit "                  )
                )
              )
            ) 
          )
        )
      )
    );
  }
});
