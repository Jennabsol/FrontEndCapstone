angular
    .module("babyMammaApp")
    .factory("QuoteFactory", function ($http) {
        return Object.create(null, {


            "getQuote": {
                value: function () {
                    return $http({
                        url: "https://api.forismatic.com/api/1.0/POST?method=getQuote&format=json&lang=en"
                        // jsonp: "jsonp",
                        // dataType: "jsonp",
                        // data: {
                        //   method: "getQuote",
                        //   lang: "en",
                        //   format: "jsonp"
                        // }
                    }).then(response => {
                        const data = response.data
                        console.log(response.data)

                    })
                }
            }



        })

    })