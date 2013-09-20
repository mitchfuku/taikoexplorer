/** @jsx React.DOM */

var SearchResult = React.createClass({displayName: 'SearchResult',
  genRenderThumbDetails: function(type) {
    var vdata = this.props.videodata;
    return (
      React.DOM.div( {className:"col-md-4 video-thumb"},  
        React.DOM.a( {href:'https://www.youtube.com/watch?v=' + vdata.id.videoId},  
          React.DOM.img( {src:vdata.snippet.thumbnails.medium.url} ) 
        ) 
      ) 
      //<div class="col-md-8 video-details"> 
        //<h4 class="title"> 
          //<a href={'https://www.youtube.com/watch?v=' + vdata.id.videoId}>
            //{vdata.snippet.title}
          //</a> 
        //</h4> 
        //<p class="info"> 
          //by <a href={'https://www.youtube.com/user/' + vid.snippet.channelTitle} target="_blank">{vdata.snippet.channelTitle}</a> 
        //</p> 
        //<p class="desc">{vdata.snippet.description}</p>
      //</div>
    );
  },
  render: function() {
    console.log(this.props);
    var vdata = this.props.videodata;
    var metadata = this.props.metadata;
    return this.genRenderThumbDetails(vdata.id.kind);
  }
});
