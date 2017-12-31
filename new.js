$scope.quote = []

const displayQuote = function () {
    $http({
        url: "https://api.forismatic.com/api/1.0/",
        jsonp: "jsonp",
        dataType: "jsonp",
        data: {
          method: "getQuote",
          lang: "en",
          format: "jsonp"
        }
      })
      .then(function(data) {
        quote.quoteText = data.quoteText; // global scope to be used for share button event handlers below
        quote.quoteUrl = data.quoteLink;
        if (!data.quoteAuthor) { // in case no author is named (emtpy string is falsy value)
            quote.author = "Anonymous";
        } else {
            quote.author = data.quoteAuthor;
        }

      })
      .fail(function(err) {
        console.log('Error: ' + err.status);

    });

}
genQuote ()



function genQuote () {
  $.ajax({
      url: "https://api.forismatic.com/api/1.0/",
      jsonp: "jsonp",
      dataType: "jsonp",
      data: {
        method: "getQuote",
        lang: "en",
        format: "jsonp"
      }
    })
    .done(function(data) {
      quote = data.quoteText; // global scope to be used for share button event handlers below
      quoteUrl = data.quoteLink;
      if (!data.quoteAuthor) { // in case no author is named (emtpy string is falsy value)
        author = "Anonymous";
      } else {
        author = data.quoteAuthor;
      }
      $(".quote").html(data.quoteText);
      $(".author").html("&#8212\xa0\xa0" + author);
    })
    .fail(function(err) {
      console.log('Error: ' + err.status);
      $(".quote").html("Whoops... try again!"); // in case json doesn't load
  });
  }

  genQuote (); // gets a quote automatically when page first loads

  $("#genQuote").on("click", function() { // gets new quote on button click
    genQuote ();
    });

  //Share button event handlers
  $("#twitter").on("click", function() {
    var twtLink = "http://twitter.com/intent/tweet?text=" + encodeURIComponent(quote + " - " + author);
    window.open(twtLink,"_blank");
  });

  $("#facebook").on("click", function() {
    var fbLink = "https://www.facebook.com/sharer.php?u=" + encodeURIComponent(quoteUrl);
    window.open(fbLink,"_blank");
  });

});
