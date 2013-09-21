/** @jsx React.DOM */

var SearchResult = React.createClass({displayName: 'SearchResult',
  genRenderVideoDescription: function(desc) {
    if (desc) {
      return React.DOM.p( {className:"desc"}, desc);
    } else {
      return React.DOM.p(null, React.DOM.i(null, "No Video Description"));
    }
  },

  genRenderThumbDetails: function(type) {
    var data = this.props.videodata;
    var metadata = this.props.metadata;
    // If a video, set this to URL
    var urlmod = "watch?v=" + data.id.videoId;
    var form = 
      SearchResultForm( 
        {videodata:data,
        metadata:metadata,
        index:this.props.index,
        csrftoken:this.props.csrftoken}
      );
    switch (type) {
      case "youtube#channel" :
        urlmod = "user/" + data.snippet.channelTitle;
        form = null;
    }
    return (
      React.DOM.div(null, 
        React.DOM.div( {className:"col-md-4 video-thumb"},  
          React.DOM.a( {href:'https://www.youtube.com/' + urlmod},  
            React.DOM.img( {src:data.snippet.thumbnails.medium.url} ) 
          ) 
        ), 
        React.DOM.div( {className:"col-md-8 video-details"},  
          React.DOM.h4( {className:"title"},  
            React.DOM.a( {href:'https://www.youtube.com/' + urlmod}, 
              data.snippet.title
            ) 
          ), 
          React.DOM.p( {className:"info"},  
" by ", React.DOM.a( {href:'https://www.youtube.com/user/' + data.snippet.channelTitle, target:"_blank"}, data.snippet.channelTitle) 
          ), 
          this.genRenderVideoDescription(data.snippet.description),
          React.DOM.div( {className:"row"}, 
            form
          )
        )
      )
    );
  },

  render: function() {
    var data = this.props.videodata;
    console.log(data);
    return this.genRenderThumbDetails(data.id.kind);
  }
});
