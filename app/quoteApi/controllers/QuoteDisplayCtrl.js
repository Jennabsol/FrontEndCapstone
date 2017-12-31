angular
.module("babyMammaApp")
.controller("QuoteDisplayCtrl", function ($scope, $http) {

    $scope.quote = []



    const displayQuote = function () {
        $http({
            method: "GET",
            url: "https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en"
            // headers: {
            //     'Content-Type': 'application/json',
            //     'Access-Control-Allow-Origin': '*'
            // }

          })
          .then(response => {
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
                .catch(function(err) {
                    console.log('Error: ' + err.status);

                });

            }
            displayQuote ()



        })