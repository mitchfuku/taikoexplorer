/** @jsx React.DOM */

var SearchResultFormWrapper = React.createClass({displayName: 'SearchResultFormWrapper',
  genRenderSongsAndComposers: function() {
    console.log(this.props.metadata);
  },

  genRenderGroups: function() {
    return null;
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
              this.genRenderSongsAndComposers(),
              AddVideoDataForm(
                {videodata:this.props.videodata,
                metadata:this.props.metadata,
                csrftoken:this.props.csrftoken}
              )
            ) 
          )
        )
      )
    );
  }
});
