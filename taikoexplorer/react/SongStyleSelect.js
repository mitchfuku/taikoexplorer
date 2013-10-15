/** @jsx React.DOM */

var SongStyleSelect =  React.createClass({
  componentDidMount: function() {
    $(this.refs.songstyle.getDOMNode()).select2({
      placeholder: "Add all styles in this song",
      width: "100%"
    });
  },

  render: function() {
    return (
      <select multiple name="song_style" ref="songstyle">
        <option value="Betta">Betta</option>
        <option value="Hachijo">Hachijo</option>
        <option value="Miyake">Miyake</option>
        <option value="Naname">Naname</option>
        <option value="Odaiko">Odaiko</option>
        <option value="Yatai">Yatai</option>
        <option value="Other">Other</option>
      </select>
    );
  }

});
