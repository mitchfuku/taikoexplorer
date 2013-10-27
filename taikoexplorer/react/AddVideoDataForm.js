/** @jsx React.DOM */

var AddVideoDataForm = React.createClass({
  renderSongInput: function() {
    this.songInput = this.getInputMarkup(
      "song_title", 
      "Enter a song title", 
      "song"
    );
    return this.songInput;
  },

  renderComposerInput: function() {
    this.composerInput = this.getInputMarkup(
      "composer_name", 
      "Enter all composers of this song", 
      "composer"
    );
    return this.composerInput;
  },

  renderGroupInput: function() {
    this.groupInput = this.getInputMarkup(
      "group_name", 
      "Enter groups in this video", 
      "group"
    );
    return this.groupInput;
  },

  getInputMarkup: function(name, placeholder, querytype) {
    var that = this;
    var multiple = true;
    var selectingHandler = null;
    if (querytype === "song") {
      // If this is the song input, "autofill" the composer and styles
      // on selection of a song
      selectingHandler = function(selection) {
        var data = selection.object.data;
        var composers = data.composers;
        var styles = data.styles;
        that.composerInput.$select2
          .select2("data", composers)
          .trigger("change");
        that.songStyleInput.select2("val", styles).trigger("change");
      }
    }
    var ajax = {
      url: "yts", 
      dataType: "json",
      quietMillis: 500,
      cache: true,
      data: function(term) {
        return {
          q: term,
          type: querytype
        }
      },
      results: function(data) {
        if (data) data["query_type"] = querytype
        var results = [];
        for (var i = 0; i < data.length; i++) {
          results.push({
            id: data[i].id,
            text: data[i].text,
            data: data[i]
          });
        };
        return {results: results}
      }
    };
    var resultFormat = null;
    if (querytype == "song") {
      resultFormat = function formatResult(
          result, 
          container, 
          query, 
          escapeMarkup) { 
        var markup=[]; 
        window.Select2.util.markMatch(
          result.text, 
          query.term, 
          markup, 
          escapeMarkup
        ); 
        var markupMatch = markup.join(""); 
        if (!result.data) {
          return markupMatch;
        } 
        var src = "";
        if (result.data.videos[0]) {
          src = result.data.videos[0].fields.default_thumb_url;
        }
        var imageMarkup = "";
        var searchTermClass = "";
        if (src !== "") {
          imageMarkup = 
            '<div class="img-crop"> \
              <img src="' + src + '" /> \
            </div>';
          searchTermClass = "search-term";
        }
        return (
          '<div class="typeahead-special-match">'
            + imageMarkup + 
            '<span class="' + searchTermClass + '">'
              + markupMatch +
            '</span> \
          </div>'
        );
      }
    }
    return (
      <ReactTypeaheadInput
        allowcreate={true}
        ajax={ajax}
        outputformat={resultFormat}
        multiple={multiple}
        querytype={querytype}
        selectinghandler={selectingHandler}
        type="text"
        name={name}
        placeholder={placeholder}
        value=""
      />
    );
  },

  componentDidMount: function() {
    if (this.props.type === "songcomposer") {
      this.songStyleInput = $(this.refs.songstyle.getDOMNode());
    }
  },

  submitForm: function(e) {
    $(e.target).button('loading');
    e.preventDefault();

    var data = this.props.videodata;
    var values = {};
    var songInputData = this.songInput ?
      this.songInput.getData() : null;
    var composerInputData = this.composerInput ? 
      this.composerInput.getData() : null;
    var groupInputData = this.groupInput ?
      this.groupInput.getData() : null;

    //Add pseudo-form elements
    values["vid"] = data.id.videoId;
    values["csrfmiddlewaretoken"] = this.props.csrftoken;
    values["vdesc"] = data.snippet.description;
    values["vtitle"] = data.snippet.title;
    values["dthumb"] = data.snippet.thumbnails.default.url;
    values["mthumb"] = data.snippet.thumbnails.medium.url;
    values["ctitle"] = data.snippet.channelTitle;
    values["cid"] = data.snippet.channelId;

    if (songInputData) {
      values["song_title"] = JSON.stringify(songInputData);
    }
    if (composerInputData) {
      values["composer_name"] = JSON.stringify(composerInputData);
    }
    if (groupInputData) {
      values["group_name"] = JSON.stringify(groupInputData);
    }
    if (this.props.type === "songcomposer") {
      values["song_style"] = JSON.stringify(this.songStyleInput.val());
    }
    var that = this;
    $.ajax({url:"/add-video-data/", type:"POST", data:values})
      .done(function(data) {
        that.addToMarkup(data);
      })
      .fail(function() {
        alert("Failed to update. Contact site administrator."); 
      })
      .always(function() {
        that.props.shield.hide();
      });
  },

  addToMarkup: function(data) {
    var wrapper = this.props.wrapper;
    if (this.props.type === "songcomposer") {
      var array = wrapper.state.songs;
      if (!array) array = [];
      for (var i = 0; i < data.length; i++) {
        var newData = {
          "pk": data[i]["id"],
          fields: {
            "title": data[i]["title"]
          }
        };
        array.push(newData);
      }
      wrapper.setState({songs: array});
    } else if (this.props.type === "group") {
      var array = wrapper.state.groups;
      if (!array) array = [];
      for (var i = 0; i < data.length; i++) {
        var newData = {
          "pk": data[i]["id"],
          fields: {
            "name": data[i]["name"]
          }
        };
        array.push(newData);
      }
      wrapper.setState({groups: array});
    }
  },

  renderFormInputs: function() {
    if (this.props.type === "songcomposer") {
      return (
        <div>
          <div className="row">
            <div className="input-group col-md-6"> 
              <span className="input-group-addon">Song</span> 
              {this.renderSongInput()}
            </div> 
            <div className="input-group col-md-6"> 
              <span className="input-group-addon">Composer</span> 
              {this.renderComposerInput()}
            </div> 
          </div>
          <div className="row">
            <div className="input-group col-md-6">
              <span className="input-group-addon">Styles In Song</span> 
              <SongStyleSelect ref="songstyle" />
            </div>
          </div>
          <div className="row">
            <div className="input-group col-md-1"> 
              <button 
                type="submit" 
                className="btn btn-primary add-song"
                data-loading-text="Submitting..."
                onClick={this.submitForm}>
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
              {this.renderGroupInput()}
            </div>
          </div>
          <div className="row">
            <div className="input-group col-md-1"> 
              <button 
                type="submit" 
                className="btn btn-primary add-song"
                data-loading-text="Submitting..."
                onClick={this.submitForm}>
                Submit
              </button>
            </div>
          </div>
        </div>
      );
    }
  },
  
  render: function() {
    return (
      <form>
        {this.renderFormInputs()}
      </form>
    );
  }
});
