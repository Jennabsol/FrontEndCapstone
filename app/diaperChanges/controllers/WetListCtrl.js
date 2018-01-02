angular
    .module("babyMammaApp")
    .controller("WetListCtrl", function (DiaperFactory, $scope, $timeout, $location) {
        $scope.wet = []

        /**
         * Use factory to get all children from Firebase
         */
        DiaperFactory.diaperList("wet").then(data => {
            $scope.wet = data
        })
        $scope.deleteDiaperBtn = function () {
            console.log("first time hitting delete")
            DiaperFactory.deleteDiaper("wet",  ).then(() => {
                $timeout()
                $location.url("/diaperChanges/wet/list");
            })


        }
    })

// What this does is make Angular now watch the values URL in the browser, and when it changes,
// it tries to match the pattern /children/list. If it matches, it loads the HTML in our partial,
// and then binds that DOM to the ChildListCtrl controller.