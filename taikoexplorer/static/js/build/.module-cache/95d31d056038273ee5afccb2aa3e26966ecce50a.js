/** @jsx React.DOM */

var SearchResult = React.createClass({displayName: 'SearchResult',
  //genRenderThumbDetails: function(type) {
    //var data = this.props.videodata;
    //switch (type) {
      //case "youtube#video" :
        //return (
          //<div class="col-md-4 video-thumb"> 
            //<a href={'https://www.youtube.com/watch?v=' + data.id.videoId}> 
              //<img src={data.snippet.thumbnails.medium.url} /> 
            //</a> 
          //</div> 
          //<div class="col-md-8 video-details"> 
            //<h4 class="title"> 
              //<a href={'https://www.youtube.com/watch?v=' + data.id.videoId}>
                //{data.snippet.title}
              //</a> 
            //</h4> 
            //<p class="info"> 
              //by <a href={'https://www.youtube.com/user/' + vid.snippet.channelTitle} target="_blank">{data.snippet.channelTitle}</a> 
            //</p> 
            //<p class="desc">{data.snippet.description}</p>
          //</div>
        //);
    //}
    //return null;
  //},
  render: function() {
    console.log(this.props);
    var data = this.props.videodata;
    var metadata = this.props.metadata;
    //return this.genRenderThumbDetails(data.id.kind);
    return (null);
  }
});
