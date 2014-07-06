/** @jsx React.DOM */

var AdminFormControls = React.createClass({displayName: 'AdminFormControls',
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
        React.DOM.button( 
          {className:"btn btn-success",
          onClick:this.buttonClick,
          type:"button"}, 
          "Mark Confirmed"
        );
    } else {
      confirmButton = React.DOM.span( {className:"label label-success"}, "Confirmed");
    }
    return (
      React.DOM.div( {className:"row margin-top-12"}, 
        React.DOM.div( {className:"col-md-12 panel-group"}, 
          React.DOM.div( {className:"panel panel-info"}, 
            React.DOM.div( {className:"panel-heading"}, 
              React.DOM.h3( {className:"panel-title"}, "Admin Controls")
            ),
            React.DOM.div( {className:"panel-body"}, 
              confirmButton
            )
          )
        )
      )
    );
  }
});
