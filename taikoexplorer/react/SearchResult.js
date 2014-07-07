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

  render: function() {
    var data = this.props.videodata;
    var metadata = this.props.metadata;
    var form = 
      <SearchResultFormWrapper
        csrftoken={this.props.csrftoken}
        index={this.props.index}
        metadata={metadata}
        shield={this.props.shield}
        videodata={data}
      />;

    var adminControls = null;
    if (this.props.isadmin) {
      adminControls = 
        <AdminFormControls 
          videoid={this.props.metadata.videoData.id}
        />;
    }

    var urlmod = "watch?v=" + data.id.videoId;
    return (
      <div>
        <div className="col-md-4 video-thumb"> 
          <a href={'https://www.youtube.com/' + urlmod} target="_blank"> 
            <img src={data.snippet.thumbnails.medium.url} /> 
          </a> 
        </div> 
        <div className="col-md-8 video-details"> 
          <h4 className="title"> 
            <a href={'https://www.youtube.com/' + urlmod} target="_blank">
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
          {adminControls}
        </div>
      </div>
    );
  }
});
