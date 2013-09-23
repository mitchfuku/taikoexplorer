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

  genRenderHiddenFormInputs: function() {
    var data = this.props.videodata;
    if (!this.props.metadata) {
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

  addSongComposer: function(e) {
    e.preventDefault();
    var songInputData = this.songInput.getData();
    var composerInputData = this.composerInput.getData();
    console.log(songInputData);
    console.log(composerInputData);
    this.submitForm();
  },

  addGroup: function(e) {
    e.preventDefault();
    var groupInputData = this.groupInput.getData();
    console.log(groupInputData);
    this.submitForm();
  },

  submitForm: function() {
    var $form = $(this.form);
    console.log($form);
    var values = {};
    $.each($form.find(':input').serializeArray(), function(i, field) {
      values[field.name] = field.value;
    });
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
              this.genRenderGroupInput()
            )
          ),
          React.DOM.div( {className:"row"}, 
            React.DOM.div( {className:"input-group col-md-1"},  
              React.DOM.button( 
                {type:"submit", 
                className:"btn btn-primary add-song",
                onClick:this.addGroup}, 
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
    this.form = 
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
      );
    return this.form;
  }
});
