/** @jsx React.DOM */

var SongStyleSelect =  React.createClass({displayName: 'SongStyleSelect',
  componentDidMount: function() {
    $(this.refs.songstyle.getDOMNode()).select2({
      placeholder: "Add all styles in this song",
      width: "100%"
    });
  },

  render: function() {
    return (
      React.DOM.select( {multiple:true, name:"song_style", ref:"songstyle"}, 
        React.DOM.option( {value:"Betta"}, "Betta"),
        React.DOM.option( {value:"Hachijo"}, "Hachijo"),
        React.DOM.option( {value:"Miyake"}, "Miyake"),
        React.DOM.option( {value:"Naname"}, "Naname"),
        React.DOM.option( {value:"Odaiko"}, "Odaiko"),
        React.DOM.option( {value:"Yatai"}, "Yatai"),
        React.DOM.option( {value:"Other"}, "Other")
      )
    );
  }

});
