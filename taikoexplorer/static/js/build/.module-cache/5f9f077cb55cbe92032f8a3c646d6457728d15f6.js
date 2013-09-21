/** @jsx React.DOM */

var SearchResult = React.createClass({displayName: 'SearchResult',
  genRenderThumbDetails: function(type) {
    var data = this.props.videodata;
    var metadata = this.props.metadata;
    var urlmod = "watch?v=" + data.id.videoId;
    switch (type) {
      case "youtube#channel" :
        urlmod = "user/" + data.snippet.channelTitle;
    }
    return (
      React.DOM.div( {className:"row search-result"},  
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
          React.DOM.p( {className:"desc"}, data.snippet.description),
          SearchResultForm( 
            {videodata:data,
            metadata:metadata}
          )
        )
      )
    );
  },
  render: function() {
    var data = this.props.videodata;
    return this.genRenderThumbDetails(data.id.kind);
  }
});
