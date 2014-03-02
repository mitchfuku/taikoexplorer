/** @jsx React.DOM */

var SearchResult = React.createClass({
  renderVideoUploaderLink: function(data) {
    var link = "https://www.youtube.com/";
    var label = data.snippet.channelTitle;
    if (label) {
      link += 'user/' + data.snippet.channelTitle;
    } else {
      link += 'channel/' + data.snippet.channelId;
      label = <i>unknown user</i>;
    }
    return (
      <a href={link} target="_blank">{label}</a> 
    );
  },

  renderVideoDescription: function(desc) {
    if (desc) {
      return <p className="desc">{desc}</p>;
    } else {
      return <p><i>No Video Description</i></p>;
    }
  },

  renderThumbDetails: function(type) {
    var data = this.props.videodata;
    var metadata = this.props.metadata;
    // If a video, set this to URL
    var urlmod = "watch?v=" + data.id.videoId;
    var form = 
      <SearchResultFormWrapper
        videodata={data}
        metadata={metadata}
        index={this.props.index}
        csrftoken={this.props.csrftoken}
        shield={this.props.shield}
      />;
    switch (type) {
      case "youtube#channel" :
        urlmod = "user/" + data.snippet.channelTitle;
        form = null;
    }
    return (
      <div>
        <div className="col-md-4"> 
        <iframe 
          width="320" 
          height="180" 
          src={'//www.youtube.com/embed/' + data.id.videoId}
          frameborder="0" 
          allowfullscreen
        />
        </div> 
        <div className="col-md-8 video-details"> 
          <h4 className="title"> 
            <a href={'https://www.youtube.com/' + urlmod}>
              {data.snippet.title}
            </a> 
          </h4> 
          <p className="info"> 
            by {this.renderVideoUploaderLink(data)}
          </p> 
          {this.renderVideoDescription(data.snippet.description)}
          <div className="row">
            {form}
          </div>
        </div>
      </div>
    );
  },

  render: function() {
    var data = this.props.videodata;
    return this.renderThumbDetails(data.id.kind);
  }
});
