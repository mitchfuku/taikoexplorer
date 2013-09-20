/** @jsx React.DOM */

var SearchResult = React.createClass({
  genRenderThumbDetails: function(type) {
    var data = this.props.videodata;
    var urlmod = "watch?v=" + data.id.videoId;
    switch (type) {
      case "youtube#channel" :
        urlmod = "user/" + data.snippet.channelTitle;
    }
    return (
      <div>
        <div class="col-md-4 video-thumb"> 
          <a href={'https://www.youtube.com/' + urlmod}> 
            <img src={data.snippet.thumbnails.medium.url} /> 
          </a> 
        </div> 
        <div class="col-md-8 video-details"> 
          <h4 class="title"> 
            <a href={'https://www.youtube.com/' + urlmod}>
              {data.snippet.title}
            </a> 
          </h4> 
          <p class="info"> 
            by <a href={'https://www.youtube.com/user/' + data.snippet.channelTitle} target="_blank">{data.snippet.channelTitle}</a> 
          </p> 
          <p class="desc">{data.snippet.description}</p>
        </div>
      </div>
    );
  },
  render: function() {
    console.log(this.props);
    var data = this.props.videodata;
    var metadata = this.props.metadata;
    return this.genRenderThumbDetails(data.id.kind);
  }
});
