/** @jsx React.DOM */

var AdminFormControls = React.createClass({
  getInitialState: function() {
    return {
      isConfirmed: false,
    };
  },

  buttonClick: function() {
    var that = this;
    $.ajax({
      url:"/confirm-video-data/", 
      type:"POST", 
      data:{"entityid": that.props.videoid}
    })
      .done(function(data) {
        that.setState({isConfirmed: true});
      })
      .fail(function() {
        alert("Failed to confirm entry. Contact site administrator."); 
      })
      .always(function() {
      });
  },

  render: function() {
    var confirmButton = null;
    if (!this.state.isConfirmed) {
      confirmButton = 
        <button 
          className="btn btn-success"
          onClick={this.buttonClick}
          type="button">
          Mark Confirmed
        </button>;
    } else {
      confirmButton = <span className="label label-success">Confirmed</span>;
    }
    return (
      <div className="row margin-top-12">
        <div className="col-md-12 panel-group">
          <div className="panel panel-info">
            <div className="panel-heading">
              <h3 className="panel-title">Admin Controls</h3>
            </div>
            <div className="panel-body">
              {confirmButton}
            </div>
          </div>
        </div>
      </div>
    );
  }
});
