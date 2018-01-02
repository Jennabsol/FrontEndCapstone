angular
    .module("babyMammaApp")
    .controller("QuoteDisplayCtrl", function ($scope, $http) {

        $scope.quote = []



        const displayQuote = function () {
            $http.jsonp("https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=angular.callbacks._0", {
                    jsonpCallbackParam: 'callback'
                })
                .then(function (response) {

                    $scope.quote = response.data
                    //   .then(function(data) {
                    //     quote.quoteText = data.quoteText; // global scope to be used for share button event handlers below
                    //     quote.quoteUrl = data.quoteLink;
                    //     if (!data.quoteAuthor) { // in case no author is named (emtpy string is falsy value)
                    //         quote.author = "Anonymous";
                    //     } else {
                    //         quote.author = data.quoteAuthor;
                    //     }


                })
                .catch(function (err) {
                    console.log(err);

                });

        }
        displayQuote()



    })