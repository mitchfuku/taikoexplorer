function LoadingIcon (params) {
  this.loadingIconDiv = params.loadingIconDiv;
  this.shield;
  this.initLoadingIcon();
}

LoadingIcon.prototype = {
	initLoadingIcon: function() {
    this.shield = this.loadingIconDiv.wrap('<div id="shield"><div id="loading-wrapper"></div></div>').parent().parent();
    this.hideLoadingIcon(0);
    this.shield.css({
      "position": "fixed",
      "height": "100%",
      "width": "100%",
      "background": "rgba(119, 119, 119, 0.5)",
      "top": 0,
      "bottom": 0,
      "z-index": 1000
    });
    //Loading wrapper
    $(this.shield.children()[0]).css({
      "position": "absolute",
      "height": "120px",
      "width": "100px",
      "top": "50%",
      "left": "50%",
      "background": "rgba(51, 51, 51, 0.7)",
      "margin-left": "-50px",
      "border-radius": "5px",
      "margin-top": "-60px",
    });
    $(this.shield.children()[0]).append('<p class="loading-text">Loading...</p>');

    //Special styling for IE
    if ($.browser && $.browser.msie && $.browser.version != 10) {
      this.loadingIconDiv.removeClass("not-ie-loader");
      this.loadingIconDiv.css({
        "position": "relative",
        "height": "48px",
        "width": "48px",
        "top": "50%",
        "left": "50%",
        "background-image": "url('/static/img/loader.gif')",
        "margin-left": "-24px",
        "margin-top": "-40px"
      });
      $($(this.shield.children()[0]).children()[1]).css({
        "margin-top": "80px"
      });
    }
	},

    //Hide specifying milliseconds
    hideLoadingIcon: function(ms) {
        this.shield.fadeOut(ms);
    },

    showLoadingIcon: function(ms) {
        this.shield.fadeIn(ms);
    }
}
