/** @jsx React.DOM */

var SongStyleSelect =  React.createClass({displayName: 'SongStyleSelect',
  componentDidMount: function() {
    this.$select2 = $(this.refs.songstyle.getDOMNode());
    this.$select2.select2({
      placeholder: "Add all styles in this song",
      width: "100%"
    });
  },

  render: function() {
    return (
      React.DOM.select( {multiple:true, name:"song_style", ref:"songstyle"}, 
        React.DOM.option( {value:"Beta"}, "Beta"),
        React.DOM.option( {value:"Hachijo"}, "Hachijo"),
        React.DOM.option( {value:"Miyake"}, "Miyake"),
        React.DOM.option( {value:"Naname"}, "Naname"),
        React.DOM.option( {value:"Odaiko"}, "Odaiko"),
        React.DOM.option( {value:"Other"}, "Other"),
        React.DOM.option( {value:"Shime"}, "Shime"),
        React.DOM.option( {value:"Yatai"}, "Yatai")
      )
    );
  }

});
