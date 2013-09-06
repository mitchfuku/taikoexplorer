function SearchBar(params) {
  this.searchForm = params.searchDiv;
  this.displayer = params.displayer;
  this.searchInput = this.searchForm.find("input");
  this.loadingIcon = params.loadingIcon;
  //this.init();
}

SearchBar.prototype = {
  init: function() {
    console.log(window.location.pathname);
    this.searchForm.submit(function() {
      var that = this;
      that.loadingIcon.showLoadingIcon();
      $.get(
        "yts",
        { query : that.searchInput.val() },
        function(data) {
          that.displayer.clearResults();
          that.displayer.display(data);
          that.loadingIcon.hideLoadingIcon();
        }
      );
      return false;
    }.bind(this));
  },
}
