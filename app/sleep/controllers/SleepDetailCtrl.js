// this uses route parameter to request the employee and display the details
angular
.module("babyMammaApp")
.controller("SleepDetailCtrl",
    function ($scope, $location, $routeParams, SleepFactory, $timeout) {
        $scope.nap = {}
        /**
         * Use the factory to get the details of a single employee
         */

        SleepFactory.singleNap($routeParams.napId).then(nap => {
            $scope.nap = nap

        })



        $scope.deleteNap = function () {
            console.log("first time hitting delete")
            SleepFactory.deleteNap($routeParams.napId).then(() => {
                $timeout()
                $location.url("/sleep/list");
            })


        }
    }
)