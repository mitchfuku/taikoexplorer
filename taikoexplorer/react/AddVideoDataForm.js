/** @jsx React.DOM */

var AddVideoDataForm = React.createClass({
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
      <ReactTypeaheadInput
        querytype={querytype}
        type="text"
        name={name}
        placeholder={placeholder}
        value=""
      />
    );
  },

  genRenderHiddenFormInputs: function() {
    var data = this.props.videodata;
    if (!this.props.metadata) {
      return(
        <div className="hidden-form-inputs">
          <input 
            type="hidden"
            value={data.snippet.description}
            name="vdesc"
          />
          <input
            type="hidden"
            value={data.snippet.title}
            name="vtitle"
          />
          <input
            type="hidden"
            value={data.snippet.thumbnails.default.url}
            name="dthumb"
          />
        </div>
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
    $.each($form.serializeArray(), function(i, field) {
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
        <div>
          <div className="row">
            <div className="input-group col-md-6"> 
              <span className="input-group-addon">Song</span> 
              {this.genRenderSongInput()}
            </div> 
            <div className="input-group col-md-6"> 
              <span className="input-group-addon">Composer</span> 
              {this.genRenderComposerInput()}
            </div> 
          </div>
          <div className="row">
            <div className="input-group col-md-1"> 
              <button 
                type="submit" 
                className="btn btn-primary add-song"
                onClick={this.addSongComposer}>
                Submit
              </button>
            </div>
          </div>
        </div>
      );
    } else if (this.props.type === "group") {
      return (
        <div>
          <div className="row">
            <div className="input-group col-md-6"> 
              <span className="input-group-addon">Group</span> 
              {this.genRenderGroupInput()}
            </div>
          </div>
          <div className="row">
            <div className="input-group col-md-1"> 
              <button 
                type="submit" 
                className="btn btn-primary add-song"
                onClick={this.addGroup}>
                Submit
              </button>
            </div>
          </div>
        </div>
      );
    }
  },
  
  render: function() {
    var data = this.props.videodata;
    var metadata = this.props.metadata;
    this.form = 
      <form>
        <input
          type="hidden"
          value={data.id.videoId}l
          name="vid"
        />
        <input
          type="hidden"
          value={this.props.csrftoken}
          name="csrfmiddlewaretoken"
        />
        {this.genRenderHiddenFormInputs()}
        {this.genRenderFormInputs()}
      </form>;
    return this.form;
  }
});
