/** @jsx React.DOM */

var AddVideoDataForm = React.createClass({displayName: 'AddVideoDataForm',
  genRenderSongInput: function() {
    this.songInput = this.getSongMarkup(
      "song_title", 
      "Enter Song Title", 
      "song"
    );
    return this.songInput;
  },

  getSongMarkup: function(name, placeholder, querytype) {
    return (
      ReactTypeaheadInput(
        {querytype:querytype,
        type:"text",
        name:name,
        placeholder:placeholder,
        value:""}
      )
    );
  },

  genRenderHiddenFormInputs: function() {
    var data = this.props.videodata;
    if (this.props.metadata) {
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

  addSongComposer: function() {
    console.log("here");
  },

  genRenderFormInputs: function() {
    if (this.props.type === "songcomposer") {
      return (
        React.DOM.div(null, 
          React.DOM.div( {className:"row"}, 
            React.DOM.div( {className:"input-group col-md-6"},  
              React.DOM.span( {className:"input-group-addon"}, "Song"), 
              this.genRenderSongInput
            ), 
            React.DOM.div( {className:"input-group col-md-6"},  
              React.DOM.span( {className:"input-group-addon"}, "Composer"), 
              ReactTypeaheadInput(
                {querytype:"composer",
                type:"text",
                name:"composer_name",
                placeholder:"Enter Composer Name",
                value:""}
              )
            ) 
          ),
          React.DOM.div( {className:"row"}, 
            React.DOM.div( {className:"input-group col-md-1"},  
              React.DOM.button( 
                {type:"submit", 
                className:"btn btn-primary add-song",
                onClick:this.addSongComposer}, 
" Submit "              )
            )
          )
        )
      );
    } else if (this.props.type === "group") {
      return (
        React.DOM.div(null, 
          React.DOM.div( {className:"row"}, 
            React.DOM.div( {className:"input-group col-md-6"},  
              React.DOM.span( {className:"input-group-addon"}, "Group"), 
              ReactTypeaheadInput(
                {querytype:"group",
                type:"text",
                name:"group_name",
                placeholder:"Enter Group Name",
                value:""}
              )
            )
          ),
          React.DOM.div( {className:"row"}, 
            React.DOM.div( {className:"input-group col-md-1"},  
              React.DOM.button( {type:"submit", className:"btn btn-primary add-song"}, 
" Submit "              )
            )
          )
        )
      );
    }
  },
  
  render: function() {
    var data = this.props.videodata;
    var metadata = this.props.metadata;
    return (
      React.DOM.form(null, 
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
        this.genRenderFormInputs()
      )
    );
  }
});
