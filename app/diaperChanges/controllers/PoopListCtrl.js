angular
    .module("babyMammaApp")
    .controller("PoopListCtrl", function (DiaperFactory, $scope, $timeout, $location) {
        $scope.poop = []

        /**
         * Use factory to get all children from Firebase
         */
        DiaperFactory.diaperList("poop").then(data => {
            $scope.poop = data
        })
        $scope.deleteDiaperBtn = function (poop) {
            console.log("first time hitting delete")
            DiaperFactory.deleteDiaper("poop", poop.id ).then(() => {
                $timeout()
                $location.url("/diaperChanges/poop/list");
            })


        }
    })

// What this does is make Angular now watch the values URL in the browser, and when it changes,
// it tries to match the pattern /children/list. If it matches, it loads the HTML in our partial,
// and then binds that DOM to the ChildListCtrl controller.