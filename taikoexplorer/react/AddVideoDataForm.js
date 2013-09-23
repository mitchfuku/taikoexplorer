/** @jsx React.DOM */

var AddVideoDataForm = React.createClass({
  genRenderHiddenFormInputs: function() {
    var data = this.props.videodata;
    if (this.props.metadata) {
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

  genRenderFormInputs: function() {
    if (this.props.type === "songcomposer") {
      return (
        <div>
          <div className="row">
            <div className="input-group col-md-6"> 
              <span className="input-group-addon">Song</span> 
              <ReactTypeaheadInput
                querytype="song"
                type="text"
                name="song_title"
                placeholder="Enter Song Title"
                value=""
              />
            </div> 
            <div className="input-group col-md-6"> 
              <span className="input-group-addon">Composer</span> 
              <ReactTypeaheadInput
                querytype="composer"
                type="text"
                name="composer_name"
                placeholder="Enter Composer Name"
                value=""
              />
            </div> 
          </div>
          <div className="row">
            <div className="input-group col-md-1"> 
              <button type="submit" className="btn btn-primary add-song">
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
              <ReactTypeaheadInput
                querytype="group"
                type="text"
                name="group_name"
                placeholder="Enter Group Name"
                value=""
              />
            </div>
          </div>
          <div className="row">
            <div className="input-group col-md-1"> 
              <button type="submit" className="btn btn-primary add-song">
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
    return (
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
      </form>
    );
  }
});
