/** @jsx React.DOM */

var AddVideoDataForm = React.createClass({displayName: 'AddVideoDataForm',
  genRenderSongInput: function() {
    this.songInput = this.getInputMarkup(
      "song_title", 
      "Enter a song title", 
      "song"
    );
    return this.songInput;
  },

  genRenderComposerInput: function() {
    this.composerInput = this.getInputMarkup(
      "composer_name", 
      "Enter all composers of this song", 
      "composer"
    );
    return this.composerInput;
  },

  genRenderGroupInput: function() {
    this.groupInput = this.getInputMarkup(
      "group_name", 
      "Enter groups in this video", 
      "group"
    );
    return this.groupInput;
  },

  getInputMarkup: function(name, placeholder, querytype) {
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
            text: data[i].text
          });
        };
        return {results: results}
      }
    };
    return (
      ReactTypeaheadInput(
        {allowcreate:true,
        ajax:ajax,
        querytype:querytype,
        type:"text",
        name:name,
        placeholder:placeholder,
        value:""}
      )
    );
  },

  componentDidMount: function() {
    console.log(this);
    this.songStyleInput = $(this.refs.songstyle.getDOMNode()).select2({
      placeholder: "Add all styles in this song",
      width: "100%"
    });
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
    if (!this.props.metadata) {
      values["vdesc"] = data.snippet.description;
      values["vtitle"] = data.snippet.title;
      values["dthumb"] = data.snippet.thumbnails.default.url;
    }
    if (songInputData)
      values["song_title"] = JSON.stringify(songInputData);
    if (composerInputData)
      values["composer_name"] = JSON.stringify(composerInputData);
    if (groupInputData)
      values["group_name"] = JSON.stringify(groupInputData);
    values["song_style"] = JSON.stringify(this.songStyleInput.val());
    var that = this;
    $.ajax({url:"/add-video-data/", type:"POST", data:values})
      .done(function(data) {
        console.log(that);
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
    console.log(this);
    console.log(data);
    if (this.props.type === "songcomposer") {
      var wrapper = this.props.wrapper;
      var array = wrapper.state.songs;
      if (!array) array = [];
      for (var i = 0; i < data.length; i++) {
        var newData = {fields: {title: data[i]["title"]}};
        array.push(newData);
      }
      wrapper.setState({songs: array});
    } else if (this.props.type === "group") {
      var wrapper = this.props.wrapper;
      var array = wrapper.state.groups;
      if (!array) array = [];
      for (var i = 0; i < data.length; i++) {
        var newData = {fields: {name: data[i]["name"]}};
        array.push(newData);
      }
      wrapper.setState({groups: array});
    }
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
            React.DOM.div( {className:"input-group col-md-6"}, 
              React.DOM.span( {className:"input-group-addon"}, "Style"), 
              React.DOM.select( {multiple:true, name:"song_style", ref:"songstyle"}, 
                React.DOM.option( {value:"Betta"}, "Betta"),
                React.DOM.option( {value:"Hachijo"}, "Hachijo"),
                React.DOM.option( {value:"Miyake"}, "Miyake"),
                React.DOM.option( {value:"Naname"}, "Naname"),
                React.DOM.option( {value:"Odaiko"}, "Odaiko"),
                React.DOM.option( {value:"Yatai"}, "Yatai"),
                React.DOM.option( {value:"Other"}, "Other")
              )
            )
          ),
          React.DOM.div( {className:"row"}, 
            React.DOM.div( {className:"input-group col-md-1"},  
              React.DOM.button( 
                {type:"submit", 
                className:"btn btn-primary add-song",
                'data-loading-text':"Submitting...",
                onClick:this.submitForm}, 
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
                'data-loading-text':"Submitting...",
                onClick:this.submitForm}, 
" Submit "              )
            )
          )
        )
      );
    }
  },
  
  render: function() {
    var metadata = this.props.metadata;
    return (
      React.DOM.form(null, 
        this.genRenderFormInputs()
      )
    );
  }
});
