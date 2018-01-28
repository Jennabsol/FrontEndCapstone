angular
    .module("babyMammaApp")
    .controller("SleepListCtrl", function (SleepFactory, $scope, ChildFactory, $routeParams, $route) {

        $scope.sleep = []

        /**
         * Use factory to get all children from Firebase
         */
        ChildFactory.single($routeParams.childId).then(child => {
            $scope.child = child

            SleepFactory.napList(child.childId).then(data => {
                $scope.sleep = data


            })

        })
        $scope.deleteNapBtn = function (sleep) {
            console.log("first time hitting delete")
            SleepFactory.deleteNap("sleep", sleep.id).then(() => {
                // $timeout()
                // $location.url("/diaperChanges/sleep/list");
                $route.reload()
            })




        }
    })

// What this does is make Angular now watch the values URL in the browser, and when it changes,
// it tries to match the pattern /children/list. If it matches, it loads the HTML in our partial,
// and then binds that DOM to the ChildListCtrl controller.