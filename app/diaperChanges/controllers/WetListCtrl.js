angular
    .module("babyMammaApp")
    .controller("WetListCtrl", function (ChildFactory, DiaperFactory, $scope, $timeout, $location, $routeParams, $route) {
        $scope.wet = []

        /**
         * Use factory to get all children from Firebase
         */
        ChildFactory.single($routeParams.childId).then(child => {
            $scope.child = child

            DiaperFactory.diaperList("wet", child.childId).then(data => {
                $scope.wet = data
            })

        })


        $scope.deleteDiaperWetBtn = function (wet) {
            console.log("first time hitting delete")
            DiaperFactory.deleteDiaper("wet", wet.id).then(() => {

                $route.reload()
            })


        }
    })

// What this does is make Angular now watch the values URL in the browser, and when it changes,
// it tries to match the pattern /children/list. If it matches, it loads the HTML in our partial,
// and then binds that DOM to the ChildListCtrl controller.