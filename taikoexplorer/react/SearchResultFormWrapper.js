/** @jsx React.DOM */

var SearchResultFormWrapper = React.createClass({
  getInitialState: function() {
    var metadata = this.props.metadata;
    if (metadata) {
      return {
        groups: metadata.groups,
        songs: metadata.songs,
        showAddWarning: false,
        isConfirmed: metadata.videoData ?
          metadata.videoData.is_confirmed :
          false
      };
    } else {
      return {
        groups: null,
        isConfirmed: false
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
                csrftoken={this.props.csrftoken}
                metadata={this.props.metadata}
                shield={this.props.shield}
                type={type}
                videodata={this.props.videodata}
                wrapper={this}>
              </AddVideoDataForm>
            </div>
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

    // Update the state of the video details
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
    var addSongOrComposerButton = this.state.isConfirmed ?
      null :
      <a onClick={this.addSongOrComposer}>
        Add a song or composer
      </a>;
    if (!metadata || !metadata.length) {
      return (
        <div>
          <p><i>No songs or composers listed</i></p>
          {addSongOrComposerButton}
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
                var composers = song.fields.composers;
                var styles = song.fields.styles;
                var byLabel = <span> by </span>;
                if (!composers) byLabel = null;
                return (
                  <li className="list-group-item">
                    {that.state.isConfirmed ?
                      null :
                      <button 
                        type="button" 
                        data={JSON.stringify(data)}
                        onClick={that.deleteEntry}
                        className="close delete-entry" 
                        data-dismiss="alert" 
                        aria-hidden="true">
                        &times;
                      </button>
                    }
                    <div className="song-tag">
                      <a 
                        href={"/?query=" + song.fields.title}
                        title="Search other songs with the same name">
                        {song.fields.title}
                      </a>
                      {byLabel}
                      {composers.map(
                        function(composer, idx, arr) {
                          var connector = null;
                          if (idx < arr.length - 1) {
                            connector = <span>, </span>;
                          }
                          return (
                            <span>
                              <a 
                                href={"/?query=" + composer.fields.full_name}
                                title="Search other songs by this composer">
                                {composer.fields.full_name}
                              </a>
                              {connector}
                            </span>
                          );
                        }
                      )}
                    </div>
                    <div className="song-tag">
                      Styles:{' '}
                      {styles.map(
                        function(style, idx, arr) {
                          var connector = null;
                          if (idx < arr.length - 1) {
                            connector = <span>, </span>;
                          }
                          return (
                            <span>
                              <a 
                                href={"/?query=" + style.fields.name}
                                title="Search other songs in the same style">
                                {style.fields.name}
                              </a>
                              {connector}
                            </span>
                          );
                        }
                      )}
                    </div>
                  </li>
                );
              }
            )}
          </ul>
          {addSongOrComposerButton}
        </div>
      );
    }
  },

  renderGroups: function() {
    var metadata = this.state.groups;
    var addGroupButton = this.state.isConfirmed ?
      null :
      <a onClick={this.addGroup}>
        Add a group
      </a>;
    if (!metadata || !metadata.length) {
      return (
        <div>
          <p><i>No groups listed</i></p>
          {addGroupButton}
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
                    {that.state.isConfirmed ?
                      null :
                      <button 
                        type="button" 
                        data={JSON.stringify(data)}
                        onClick={that.deleteEntry}
                        className="close delete-entry" 
                        data-dismiss="alert" 
                        aria-hidden="true">
                        &times;
                      </button>
                    }
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
          {addGroupButton}
        </div>
      );
    }
  },

  render: function() {
    var confirmedLabel = null;
    var hint = null;
    if (this.state.isConfirmed) {
      confirmedLabel = 
        <span className="margin-left-8 label label-success">Confirmed</span>;
      hint = 
        <ReactHoverHint 
          className="margin-left-4" 
          hintText="Confirmed songs cannot be edited"
          hintWidth={126}
        />;
    }

    return(
      <div
        className="panel-group col-md-12"
        id={"accordion" + this.props.index}>
        <div className={"panel panel-default"}>
          <div className="panel-heading">
            <h5 className="panel-title video-accordion">
              <a 
                className="accordion-toggle"
                data-toggle="collapse" 
                data-parent={"#accordion" + this.props.index} 
                href={"#collapse" + this.props.index}>
                Video Information
              </a>
              {confirmedLabel}
              {hint}
            </h5>
          </div>
          <div 
            id={"collapse" + this.props.index} 
            className="panel-collapse collapse in">
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
