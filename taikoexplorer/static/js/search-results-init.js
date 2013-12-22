var data = dataSafe;
var shield = React.renderComponent(
  Shield({}),
  document.getElementById('shield-container')
);
React.renderComponent(
  SearchResultContainer(
    {
      data:data,
      csrftoken:csrfToken, 
      shield: shield
    }
  ),
  document.getElementById('react-search-results')
);
React.renderComponent(
  SearchResultsPager(
    {
      nextpagetoken:data.videos.nextPageToken,
      prevpagetoken:data.videos.prevPageToken,
      query:data.query,
      type:queryType,
    }
  ),
  document.getElementById('react-pager')
);

