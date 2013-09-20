/** @jsx React.DOM */

var SearchResult = React.createClass({displayName: 'SearchResult',
  genRenderThumbDetails: function(type) {
    var data = this.props.videodata;
    switch (type) {
      case "youtube#video" :
        return (
          React.DOM.div( {className:"col-md-4 video-thumb"},  
            React.DOM.a( {href:'https://www.youtube.com/watch?v=' + data.id.videoId},  
              React.DOM.img( {src:data.snippet.thumbnails.medium.url} ) 
            ) 
          ) 
        );
    }
    return null;
  },
  render: function() {
    console.log(this.props);
    var data = this.props.videodata;
    var metadata = this.props.metadata;
    return this.genRenderThumbDetails(data.id.kind);
  }
});
