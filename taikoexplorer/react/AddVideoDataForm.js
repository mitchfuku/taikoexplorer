/** @jsx React.DOM */

var AddVideoDataForm = React.createClass({
  genRenderHiddenFormInputs: function() {
    var data = this.props.videodata;
    if (metadata) {
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
  
  render: function() {
    return (
      <form id="form-container">
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
        <div className="row">
          <div className="input-group col-md-4"> 
            <span className="input-group-addon">Song</span> 
            <ReactInput
              classname="form-control"
              name="song_title"
              placeholder="Enter Song Title"
              type="text"
              value=""
            /> 
          </div> 
          <div className="input-group col-md-5"> 
            <span className="input-group-addon">Composer</span> 
            <ReactInput
              classname="form-control"
              name="composer_name"
              placeholder="Enter Composer Name"
              type="text"
              value=""
            /> 
          </div> 
          <div className="input-group col-md-3"> 
            <button type="submit" className="btn btn-primary add-song">
              Submit
            </button>
          </div>
        </div>
        <div className="row">
          <div className="input-group col-md-6"> 
            <span className="input-group-addon">Group</span> 
            <ReactInput
              classname="form-control"
              name="group_name"
              placeholder="Enter Group Name"
              type="text"
              value=""
            /> 
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    );
  }
});
