/** @jsx React.DOM */

var SearchResultFormWrapper = React.createClass({displayName: 'SearchResultFormWrapper',
  addSongOrComposer: function(e) {
    var shield = this.props.shield;
    shield.setChildren(
      React.DOM.div( {className:"shield-content container"}, 
        React.DOM.div( {className:"row"}, 
          React.DOM.div( {className:"col-md-8 col-md-offset-2 form-container"}, 
            AddVideoDataForm(
              {videodata:this.props.videodata,
              metadata:this.props.metadata,
              csrftoken:this.props.csrftoken,
              type:"songcomposer"}
            )
          )
        )
      )
    );
    shield.show();
  },

  addGroup: function(e) {
    var shield = this.props.shield;
    shield.setChildren(
      React.DOM.div( {className:"shield-content container"}, 
        React.DOM.div( {className:"row"}, 
          React.DOM.div( {className:"col-md-8 col-md-offset-2 form-container"}, 
            AddVideoDataForm(
              {videodata:this.props.videodata,
              metadata:this.props.metadata,
              csrftoken:this.props.csrftoken,
              type:"group"}
            )
          )
        )
      )
    );
    shield.show();
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
    var metadata = this.props.metadata;
    if (!metadata || !metadata.groups.length) {
      return (
        React.DOM.div(null, 
          React.DOM.p(null, React.DOM.i(null, "No groups listed")),
          React.DOM.a( {onClick:this.addGroup}, 
" Add a group "          )
        )
      );
    } else {
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
                React.DOM.div( {className:"col-md-6"}, 
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