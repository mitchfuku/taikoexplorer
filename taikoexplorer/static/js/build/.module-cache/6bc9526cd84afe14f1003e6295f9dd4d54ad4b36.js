/** @jsx React.DOM */

var AddVideoDataForm = React.createClass({displayName: 'AddVideoDataForm',
  genRenderSongInput: function() {
    this.songInput = this.getInputMarkup(
      "song_title", 
      "Enter Song Title", 
      "song"
    );
    return this.songInput;
  },

  genRenderComposerInput: function() {
    this.composerInput = this.getInputMarkup(
      "composer_name", 
      "Enter Composer Name", 
      "composer"
    );
    return this.composerInput;
  },

  genRenderGroupInput: function() {
    this.groupInput = this.getInputMarkup(
      "group_name", 
      "Enter Group Name", 
      "group"
    );
    return this.groupInput;
  },

  getInputMarkup: function(name, placeholder, querytype) {
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

  submitForm: function(e) {
    e.preventDefault();
    var data = this.props.videodata;
    var values = {};
    var songInputData = this.songInput.getData();
    var composerInputData = this.composerInput.getData();
    var groupInputData = this.groupInput.getData();

    //Add pseudo-form elements
    values["vid"] = data.id.videoId;
    values["csrfmiddlewaretoken"] = this.props.csrftoken;
    if (!this.props.metadata) {
      values["vdesc"] = data.snippet.description;
      values["vtitle"] = data.snippet.title;
      values["dthumb"] = data.snippet.thumbnails.default.url;
    }
    console.log(JSON.stringify(songInputData));
    console.log(values);
    //$.post(
      //"/add-video-data",
      //values,
      //function() {
        //console.log("success");
      //}
    //);
    this.props.shield.hide();
  },

  genRenderFormInputs: function() {
    if (this.props.type === "songcomposer") {
      return (
        React.DOM.div(null, 
          React.DOM.div( {className:"row"}, 
            React.DOM.div( {className:"input-group col-md-6"},  
              React.DOM.span( {className:"input-group-addon"}, "Song"), 
              this.genRenderSongInput()
            ), 
            React.DOM.div( {className:"input-group col-md-6"},  
              React.DOM.span( {className:"input-group-addon"}, "Composer"), 
              this.genRenderComposerInput()
            ) 
          ),
          React.DOM.div( {className:"row"}, 
            React.DOM.div( {className:"input-group col-md-1"},  
              React.DOM.button( 
                {type:"submit", 
                className:"btn btn-primary add-song",
                onClick:this.submitForm}, 
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
              this.genRenderGroupInput()
            )
          ),
          React.DOM.div( {className:"row"}, 
            React.DOM.div( {className:"input-group col-md-1"},  
              React.DOM.button( 
                {type:"submit", 
                className:"btn btn-primary add-song",
                onClick:this.submitForm}, 
" Submit "              )
            )
          )
        )
      );
    }
  },
  
  render: function() {
    var metadata = this.props.metadata;
    this.form = 
      React.DOM.form(null, 
        this.genRenderFormInputs()
      );
    return this.form;
  }
});
