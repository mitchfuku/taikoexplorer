/** @jsx React.DOM */

var SearchResultFormWrapper = React.createClass({
  render: function() {
    var metadata = this.props.metadata;
    var data = this.props.videodata;
    return(
      <div
        className="panel-group col-md-12"
        id={"accordion" + this.props.index}>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h5 className="panel-title video-accordion">
              <a 
                className="accordion-toggle"
                data-toggle="collapse" 
                data-parent={"#accordion" + this.props.index} 
                href={"#collapse" + this.props.index}>
                Video Information
              </a>
            </h5>
          </div>
          <div 
            id={"collapse" + this.props.index} 
            className="panel-collapse collapse">
            <div className="panel-body">
              <AddVideoDataForm
                videodata={data}
                metadata={metadata}
                csrftoken={this.props.csrftoken}
              />
            </div> 
          </div>
        </div>
      </div>
    );
  }
});
