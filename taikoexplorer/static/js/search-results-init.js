var shield = React.renderComponent(
  Shield({}),
  document.getElementById('shield-container')
);
React.renderComponent(
  SearchResultContainer(
    {
      data:dataSafe,
      csrftoken:csrfToken, 
      shield: shield
    }
  ),
  document.getElementById('react-search-results')
);
React.renderComponent(
  SearchResultsPager(
    {
      nextpagetoken:dataSafe.videos.nextPageToken,
      prevpagetoken:dataSafe.videos.prevPageToken,
      query:dataSafe.query,
      type:queryType,
    }
  ),
  document.getElementById('react-pager')
);

