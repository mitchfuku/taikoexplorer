var shield = React.renderComponent(
  Shield({}),
  document.getElementById('shield-container')
);
React.renderComponent(
  AdminSongResultContainer(
    {
      videoItems: dataSafe.unconfirmed_songs.videos.items,
      videoMetadata: dataSafe.unconfirmed_songs.videos.metadata,
      csrftoken: csrfToken, 
      shield: shield
    }
  ),
  document.getElementById('react-unconfirmed-results')
);
