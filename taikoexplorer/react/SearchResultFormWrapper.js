/** @jsx React.DOM */

var SearchResultFormWrapper = React.createClass({
  addSongOrComposer: function(e) {
    var shield = this.props.shield;
    var form = this.addForm(
      "songcomposer",
      "Add a song and composer"
    );
    shield.setChildren(form);
    shield.show();
  },

  hideShield: function(e) {
    e.preventDefault();
    this.props.shield.hide();
  },

  addGroup: function(e) {
    var shield = this.props.shield;
    var form = this.addForm(
      "group",
      "Add a Group"
    );
    shield.setChildren(form);
    shield.show();
  },

  addForm: function(type, label) {
    return (
      <div className="shield-content container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2 form-container">
            <button 
              type="button" 
              onClick={this.hideShield}
              className="close" 
              data-dismiss="alert" 
              aria-hidden="true">
              &times;
            </button>
            <div className="row">
              <h4>{label}</h4>
            </div>
            <div className="row">
              <AddVideoDataForm
                videodata={this.props.videodata}
                metadata={this.props.metadata}
                csrftoken={this.props.csrftoken}
                type={type}
                shield={this.props.shield}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },

  genRenderSongsAndComposers: function() {
    var metadata = this.props.metadata;
    if (!metadata || (!metadata.songs.length && !metadata.composers.length)) {
      return (
        <div>
          <p><i>No songs or composers listed</i></p>
          <a onClick={this.addSongOrComposer}>
            Add a song or composer
          </a>
        </div>
      );
    } else {
      var songs = metadata.songs;
      var composers = metadata.composers;
    }
  },

  genRenderGroups: function() {
    var metadata = this.props.metadata;
    if (!metadata || !metadata.groups.length) {
      return (
        <div>
          <p><i>No groups listed</i></p>
          <a onClick={this.addGroup}>
            Add a group
          </a>
        </div>
      );
    } else {
      var groups = metadata.groups;
      <ul className="list-group">
        {groups.map(
          function(group) {
            return <li className="list-group-item">group.name</li>;
          }
        )}
      </ul>
    }
  },

  render: function() {
    return(
      <div
        className="panel-group col-md-12"
        id={"accordion" + this.props.index}>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h5 className="panel-title video-accordion">
              <a 
                className="accordion-toggle"
                data-toggle="collapse" 
                data-parent={"#accordion" + this.props.index} 
                href={"#collapse" + this.props.index}>
                Video Information
              </a>
            </h5>
          </div>
          <div 
            id={"collapse" + this.props.index} 
            className="panel-collapse collapse">
            <div className="panel-body">
              <div className="row video-db-details">
                <div className="col-md-6 songs-and-composers">
                  {this.genRenderSongsAndComposers()}
                </div>
                <div className="col-md-6">
                  {this.genRenderGroups()}
                </div>
              </div>
            </div> 
          </div>
        </div>
      </div>
    );
  }
});
