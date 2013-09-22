/** @jsx React.DOM */

var AddVideoDataForm = React.createClass({displayName: 'AddVideoDataForm',
  genRenderHiddenFormInputs: function() {
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
  
  render: function() {
    return (
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
          React.DOM.div( {className:"input-group col-md-4"},  
            React.DOM.span( {className:"input-group-addon"}, "Song"), 
            ReactInput(
              {classname:"form-control",
              name:"song_title",
              placeholder:"Enter Song Title",
              type:"text",
              value:""}
            ) 
          ), 
          React.DOM.div( {className:"input-group col-md-5"},  
            React.DOM.span( {className:"input-group-addon"}, "Composer"), 
            ReactInput(
              {classname:"form-control",
              name:"composer_name",
              placeholder:"Enter Composer Name",
              type:"text",
              value:""}
            ) 
          ), 
          React.DOM.div( {className:"input-group col-md-3"},  
            React.DOM.button( {type:"submit", className:"btn btn-primary add-song"}, 
" Submit "            )
          )
        ),
        React.DOM.div( {className:"row"}, 
          React.DOM.div( {className:"input-group col-md-6"},  
            React.DOM.span( {className:"input-group-addon"}, "Group"), 
            ReactInput(
              {classname:"form-control",
              name:"group_name",
              placeholder:"Enter Group Name",
              type:"text",
              value:""}
            ) 
          ),
          React.DOM.button( {type:"submit", className:"btn btn-primary"}, 
" Submit "          )
        )
      )
    );
  }
});
