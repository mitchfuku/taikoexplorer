/** @jsx React.DOM */

var SearchResultForm = React.createClass({
  genRenderHiddenFormInputs: function() {
    var metadata = this.props.metadata;
    var data = this.props.videodata;
    if (metadata) {
      return(
        <div class="hidden-form-inputs">
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
    var metadata = this.props.metadata;
    var data = this.props.videodata;
    return(
      <div class="panel-group col-md-12" id={"accordion" + this.props.index}>
        <div class="panel panel-default">
          <div class="panel-heading">
            <h4 class="panel-title">
              <a 
                class="accordion-toggle"
                data-toggle="collapse" 
                data-parent={"#accordion" + this.props.index} 
                href={"#collapse" + this.props.index}>
                Video Information
              </a>
            </h4>
          </div>
          <div 
            id={"collapse" + this.props.index} 
            class="panel-collapse collapse">
            <div class="panel-body">
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
                <div class="row">
                  <div class="input-group col-md-6"> 
                    <span class="input-group-addon">Song</span> 
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter Song Title"
                      name="song_title"
                      value=""
                    /> 
                  </div> 
                  <div class="input-group col-md-6"> 
                    <span class="input-group-addon">Composer</span> 
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter Composer Name"
                      name="composer_name"
                      value=""
                    /> 
                  </div> 
                  <button type="submit" class="btn btn-primary add-song">
                    Submit
                  </button>
                </div>
                <div class="row">
                  <div class="input-group col-md-6"> 
                    <span class="input-group-addon">Group</span> 
                    <input 
                      type="text"
                      class="form-control"
                      placeholder="Enter Group Name"
                      name="group_name"
                      value=""
                    />
                  </div>
                  <button type="submit" class="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div> 
          </div>
        </div>
      </div>
    );
  }
});
