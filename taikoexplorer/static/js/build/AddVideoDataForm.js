/** @jsx React.DOM */

var AddVideoDataForm = React.createClass({displayName: 'AddVideoDataForm',
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
    var focus = false;
    var selectingHandler = null;
    if (querytype === "song" || querytype === "group") {
      focus = true;
    }
    if (querytype === "song") {
      // If this is the song input, "autofill" the composer and styles
      // on selection of a song
      multiple = false;
      selectingHandler = function(selection) {
        var data = selection.object.data;
        if (!data) return;
        that.autofillData = data;
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
      quietMillis: 100,
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
        escapeMarkup
      ) { 
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
        var styles = null;
        if (result.data.videos[0]) {
          console.log(result);
          src = result.data.videos[0].fields.default_thumb_url;
          styles = result.data.styles;
          composers = result.data.composers;
        }
        var imageMarkup = "";
        var searchTermClass = "";
        var styleMarkup = "";
        var composerMarkup = "";
        if (src !== "") {
          imageMarkup = 
            '<div class="img-crop"> \
              <img class="image" src="' + src + '" /> \
            </div>';
          searchTermClass = "search-term";

          // Only need to show this if we have a thumbnail which means
          // that we have a matching song in the DB
          if (styles) {
            styleString = "";
            styles.forEach(function(style) {
              styleString += (style + ", ");
            });
            styleMarkup =
              '<span class="styles">'
                + 'Styles: ' + 
                styleString.slice(0, styleString.length - 2) +
              '</span>';
          }
          if (composers) {
            composerString = "";
            composers.forEach(function(composer) {
              composerString += (composer.text + ", ");
            });
            composerMarkup =
              '<span class="composers">'
                + 'By: ' + 
                composerString.slice(0, composerString.length - 2) +
              '</span>';
          }
        }
        return (
          '<div class="typeahead-special-match">'
            + imageMarkup + 
            '<span class="' + searchTermClass + '">'
              + markupMatch +
            '</span>'
            + composerMarkup +
            styleMarkup +
          '</div>'
        );
      }
    }
    return (
      ReactTypeaheadInput(
        {allowcreate:true,
        ajax:ajax,
        focus:focus,
        outputformat:resultFormat,
        multiple:multiple,
        querytype:querytype,
        selectinghandler:selectingHandler,
        type:"text",
        name:name,
        placeholder:placeholder,
        value:""}
      )
    );
  },

  componentDidMount: function() {
    if (this.props.type === "songcomposer") {
      this.songStyleInput = $(this.refs.songstyle.getDOMNode());
    }
  },

  /**
   * returns false if both arrays do not have the same IDs
   * returns true otherwise
   */
  compareArrayIDs: /* private */ function(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;

    for (var i = 0; i < arr1.length; i++) {
      var a1 = arr1[i];
      var found = false;
      for (var j = 0; j < arr2.length; j++) {
        var a2 = arr2[j];
        /**
         * Hack but this compares values for song styles which
         * do no have an ID
         */
        if (a1.id === undefined && a2.id === undefined) {
          if (a1 === a2) {
            found = true;
            break;
          }
        } else {
          if (a1.id === a2.id) {
            found = true;
            break;
          }
        }
      }
      if (!found) return false;
    }
    return true;
  },

  isAutofillDataEdited: function(composers, songStyles) {
    if (!this.autofillData) return false;
    var foundComposer = this.compareArrayIDs(
      this.autofillData.composers, 
      composers
    );
    var foundStyle = this.compareArrayIDs(this.autofillData.styles, songStyles);
    return !(foundComposer && foundStyle);
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
    var songStyleInputData = this.songStyleInput ?
      this.songStyleInput.val() : null;

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
      values["song_style"] = JSON.stringify(songStyleInputData);
    }
    if (this.autofillData) {
      if (this.isAutofillDataEdited(composerInputData, songStyleInputData)) {
        values["force_create_song"] = true;
      }
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
            "title": data[i]["title"],
            "composers": data[i]["composers"]
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
        React.DOM.div(null, 
          React.DOM.div( {className:"row"}, 
            React.DOM.div( {className:"input-group col-md-6"},  
              React.DOM.span( {className:"input-group-addon"}, "Song"), 
              this.renderSongInput()
            ), 
            React.DOM.div( {className:"input-group col-md-6"},  
              React.DOM.span( {className:"input-group-addon"}, "Composer"), 
              this.renderComposerInput()
            ) 
          ),
          React.DOM.div( {className:"row"}, 
            React.DOM.div( {className:"input-group col-md-6"}, 
              React.DOM.span( {className:"input-group-addon"}, "Styles In Song"), 
              SongStyleSelect( {ref:"songstyle"} )
            )
          ),
          React.DOM.div( {className:"row"}, 
            React.DOM.div( {className:"input-group col-md-1"},  
              React.DOM.button( 
                {type:"submit", 
                className:"btn btn-primary add-song",
                'data-loading-text':"Submitting...",
                onClick:this.submitForm}, 
                " Submit "
              )
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
              this.renderGroupInput()
            )
          ),
          React.DOM.div( {className:"row"}, 
            React.DOM.div( {className:"input-group col-md-1"},  
              React.DOM.button( 
                {type:"submit", 
                className:"btn btn-primary add-song",
                'data-loading-text':"Submitting...",
                onClick:this.submitForm}, 
                " Submit "
              )
            )
          )
        )
      );
    }
  },
  
  render: function() {
    return (
      React.DOM.form(null, 
        this.renderFormInputs()
      )
    );
  }
});
