/** @jsx React.DOM */

var SearchResultFormWrapper = React.createClass({displayName: 'SearchResultFormWrapper',
  getInitialState: function() {
    if (this.props.metadata) {
      return {
        groups: this.props.metadata.groups,
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

  genRenderAddNewEntryNotice() {
    var toadd = "";
    if (this.props.type === "group") toadd = "group";
    else toadd = "song or composer";
    var content = 
      "* - You are about to add a new " + toadd + " to the \
      database.  Are you sure there isn't an existing " + toadd + 
      " of that same name?";
    return (
      React.DOM.div( {className:"row"}, 
        React.DOM.p(null, 
        content
        )
      )
    );
  },

  addForm: function(type, label) {
    console.log(type);
    return (
      React.DOM.div( {className:"shield-content container"}, 
        React.DOM.div( {className:"row"}, 
          React.DOM.div( {className:"col-md-8 col-md-offset-2 form-container"}, 
            React.DOM.button( 
              {type:"button", 
              onClick:this.hideShield,
              className:"close", 
              'data-dismiss':"alert", 
              'aria-hidden':"true"}, 
" × "            ),
            React.DOM.div( {className:"row"}, 
              React.DOM.h4(null, label)
            ),
            React.DOM.div( {className:"row"}, 
              AddVideoDataForm(
                {videodata:this.props.videodata,
                metadata:this.props.metadata,
                csrftoken:this.props.csrftoken,
                wrapper:this,
                type:type,
                shield:this.props.shield}
              )
            ),
            this.genRenderAddNewEntryNotice()
          )
        )
      )
    );
  },

  genRenderSongsAndComposers: function() {
    var metadata = this.props.metadata;
    if (!metadata || (!metadata.songs.length && !metadata.composers.length)) {
      return (
        React.DOM.div(null, 
          React.DOM.p(null, React.DOM.i(null, "No songs or composers listed")),
          React.DOM.a( {onClick:this.addSongOrComposer}, 
" Add a song or composer "          )
        )
      );
    } else {
      var songs = metadata.songs;
      var composers = metadata.composers;
    }
  },

  genRenderGroups: function() {
    var metadata = this.state.groups;
    if (!metadata || !metadata.length) {
      return (
        React.DOM.div(null, 
          React.DOM.p(null, React.DOM.i(null, "No groups listed")),
          React.DOM.a( {onClick:this.addGroup}, 
" Add a group "          )
        )
      );
    } else {
      console.log(metadata);
      return (
        React.DOM.div(null, 
          React.DOM.p(null, "Groups in this video"),
          React.DOM.ul( {className:"list-group"}, 
            metadata.map(
              function(group) {
                return (
                  React.DOM.li( {className:"list-group-item"}, 
                    group.fields.name
                  )
                );
              }
            )
          ),
          React.DOM.a( {onClick:this.addGroup}, 
" Add a group "          )
        )
      );
    }
  },

  render: function() {
    return(
      React.DOM.div(
        {className:"panel-group col-md-12",
        id:"accordion" + this.props.index}, 
        React.DOM.div( {className:"panel panel-default"}, 
          React.DOM.div( {className:"panel-heading"}, 
            React.DOM.h5( {className:"panel-title video-accordion"}, 
              React.DOM.a( 
                {className:"accordion-toggle",
                'data-toggle':"collapse", 
                'data-parent':"#accordion" + this.props.index, 
                href:"#collapse" + this.props.index}, 
" Video Information "              )
            )
          ),
          React.DOM.div( 
            {id:"collapse" + this.props.index, 
            className:"panel-collapse collapse"}, 
            React.DOM.div( {className:"panel-body"}, 
              React.DOM.div( {className:"row video-db-details"}, 
                React.DOM.div( {className:"col-md-6 songs-and-composers"}, 
                  this.genRenderSongsAndComposers()
                ),
                React.DOM.div( {className:"col-md-6 groups"}, 
                  this.genRenderGroups()
                )
              )
            ) 
          )
        )
      )
    );
  }
});