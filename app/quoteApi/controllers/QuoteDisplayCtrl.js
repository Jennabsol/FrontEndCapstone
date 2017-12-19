angular
.module("babyMammaApp")
.controller("QuoteDisplayCtrl", function (QuoteFactory, $scope) {
    $scope.quote = []

    QuoteFactory.getQuote().then(data => {

    $scope.quote = data
    console.log(data)
    })
})