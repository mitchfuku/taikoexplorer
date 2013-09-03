function SearchBar(params) {
  this.searchForm = params.searchDiv;
  this.displayer = params.displayer;
  this.searchInput = this.searchForm.find("input");
  this.init();
}

SearchBar.prototype = {
  init: function() {
    this.searchForm.submit(function() {
      var that = this;
      $.get(
        "yts",
        { query : that.searchInput.val() },
        function(data) {
          that.displayer.clearResults();
          that.displayer.display(data);
        }
      );
      return false;
    }.bind(this));
  },
}
