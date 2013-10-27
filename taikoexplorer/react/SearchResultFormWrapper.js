/** @jsx React.DOM */

var SearchResultFormWrapper = React.createClass({
  getInitialState: function() {
    if (this.props.metadata) {
      return {
        groups: this.props.metadata.groups,
        songs: this.props.metadata.songs,
        showAddWarning: false
      };
    } else {
      return {
        groups: null
      };
    }
  },

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

  renderAddNewEntryNotice: function() {
    var toadd = "";
    if (this.props.type === "group") toadd = "group";
    else toadd = "song or composer";
    var content = "* - Indicates that you are about to add a new " + toadd + " to the database.";
    return (
      <div className="row warning">
        <div className="col-md-12">{content}</div>
      </div>
    );
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
                wrapper={this}
                type={type}
                shield={this.props.shield}>
              </AddVideoDataForm>
            </div>
            {this.renderAddNewEntryNotice()}
          </div>
        </div>
      </div>
    );
  },

  deleteEntry: function(e) {
    var entry = JSON.parse(e.target.getAttribute("data"));
    $.ajax({url:"/delete-video-data/", type:"POST", data:entry})
      .done(function(data) {
      })
      .fail(function() {
        alert("Failed to delete entry. Contact site administrator."); 
      })
      .always(function() {
      });
    var state = null;
    if (entry.type === "song") {
      state = this.state.songs;
    } else if (entry.type === "group") {
      state = this.state.groups;
    }
    for (var i = 0; i < state.length; i++) {
      if (state[i].pk == entry.eid) {
        state.splice(i, 1);
        break;
      }
    }
    if (entry.type === "song") {
      this.setState({songs: state});
    } else if (entry.type === "group") {
      this.setState({groups: state});
    }
    return false;
  },

  renderSongsAndComposers: function() {
    var metadata = this.state.songs;
    if (!metadata || !metadata.length) {
      return (
        <div>
          <p><i>No songs or composers listed</i></p>
          <a onClick={this.addSongOrComposer}>
            Add a song or composer
          </a>
        </div>
      );
    } else {
      var that = this;
      return (
        <div>
          <p>Songs in this video</p>
          <ul className="list-group">
            {metadata.map(
              function(song) {
                var data = {
                  "type": "song",
                  "vid": that.props.videodata.id.videoId,
                  "eid": song.pk
                };
                return (
                  <li className="list-group-item">
                    <button 
                      type="button" 
                      data={JSON.stringify(data)}
                      onClick={that.deleteEntry}
                      className="close delete-entry" 
                      data-dismiss="alert" 
                      aria-hidden="true">
                      &times;
                    </button>
                    <a 
                      href={"/?query=" + song.fields.title}
                      title="Search other songs with the same name">
                      {song.fields.title}
                    </a>
                  </li>
                );
              }
            )}
          </ul>
          <a onClick={this.addSongOrComposer}>
            Add a song or composer
          </a>
        </div>
      );
    }
  },

  renderGroups: function() {
    var metadata = this.state.groups;
    if (!metadata || !metadata.length) {
      return (
        <div>
          <p><i>No groups listed</i></p>
          <a onClick={this.addGroup}>
            Add a group
          </a>
        </div>
      );
    } else {
      var that = this;
      return (
        <div>
          <p>Groups in this video</p>
          <ul className="list-group">
            {metadata.map(
              function(group) {
                var data = {
                  "type": "group",
                  "vid": that.props.videodata.id.videoId,
                  "eid": group.pk
                };
                return (
                  <li className="list-group-item">
                    <button 
                      type="button" 
                      data={JSON.stringify(data)}
                      onClick={that.deleteEntry}
                      className="close delete-entry" 
                      data-dismiss="alert" 
                      aria-hidden="true">
                      &times;
                    </button>
                    <a 
                      href={"/?query=" + group.fields.name}
                      title="Search other groups with the same name">
                      {group.fields.name}
                    </a>
                  </li>
                );
              }
            )}
          </ul>
          <a onClick={this.addGroup}>
            Add a group
          </a>
        </div>
      );
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
                  {this.renderSongsAndComposers()}
                </div>
                <div className="col-md-6 groups">
                  {this.renderGroups()}
                </div>
              </div>
            </div> 
          </div>
        </div>
      </div>
    );
  }
});
