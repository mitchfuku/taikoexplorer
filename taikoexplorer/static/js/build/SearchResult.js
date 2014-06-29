/** @jsx React.DOM */

var SearchResult = React.createClass({displayName: 'SearchResult',
  renderVideoUploaderLink: function(data) {
    var link = "https://www.youtube.com/";
    var label = data.snippet.channelTitle;
    if (label) {
      link += 'user/' + data.snippet.channelTitle;
    } else {
      link += 'channel/' + data.snippet.channelId;
      label = React.DOM.i(null, "unknown user");
    }
    return (
      React.DOM.a( {href:link, target:"_blank"}, label) 
    );
  },

  renderVideoDescription: function(desc) {
    if (desc) {
      return React.DOM.p( {className:"desc"}, desc);
    } else {
      return React.DOM.p(null, React.DOM.i(null, "No Video Description"));
    }
  },

  renderThumbDetails: function(type) {
    var data = this.props.videodata;
    var metadata = this.props.metadata;
    // If a video, set this to URL
    var urlmod = "watch?v=" + data.id.videoId;
    var form = 
      SearchResultFormWrapper(
        {videodata:data,
        metadata:metadata,
        index:this.props.index,
        csrftoken:this.props.csrftoken,
        shield:this.props.shield}
      );
    switch (type) {
      case "youtube#channel" :
        urlmod = "user/" + data.snippet.channelTitle;
        form = null;
    }
    return (
      React.DOM.div(null, 
        React.DOM.div( {className:"col-md-4 video-thumb"},  
          React.DOM.a( {href:'https://www.youtube.com/' + urlmod, target:"_blank"},  
            React.DOM.img( {src:data.snippet.thumbnails.medium.url} ) 
          ) 
        ), 
        React.DOM.div( {className:"col-md-8 video-details"},  
          React.DOM.h4( {className:"title"},  
            React.DOM.a( {href:'https://www.youtube.com/' + urlmod, target:"_blank"}, 
              data.snippet.title
            ) 
          ), 
          React.DOM.p( {className:"info"},  
            "by ", this.renderVideoUploaderLink(data)
          ), 
          this.renderVideoDescription(data.snippet.description),
          React.DOM.div( {className:"row"}, 
            form
          )
        )
      )
    );
  },

  render: function() {
    var data = this.props.videodata;
    return this.renderThumbDetails(data.id.kind);
  }
});
