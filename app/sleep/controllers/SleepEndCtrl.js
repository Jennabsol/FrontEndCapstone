angular
.module("babyMammaApp")
.controller("SleepEndCtrl", function ($scope, SleepFactory, $routeParams) {
    $scope.newNap = {}

    /**
     * Use this event listener to check if there is any data
     * in the factory cache each time the user loads a view
     * that is bound to this controller
     */
    $scope.$on('$viewContentLoaded', function(event) {
        if (!SleepFactory.cache) {
            console.info("No cached data")
            SleepFactory.napList(true).then(data => {
                $scope.sleep = data
            })
        } else {
            console.info("Using cached data")
            $scope.sleep = SleepFactory.cache
        }
    })
// when the button is pushed this creates on object
    $scope.endNap = function () {
        const nap = {

            "notes": $scope.newNap.notes,
            "reason": $scope.newNap.reason


        }

        /**
         * Use the factory to POST to Firebase then clear
         */
        SleepFactory.addEndNap(nap, $routeParams.napId).then(() => {
            $scope.newNap.notes = "",
            $scope.newNap.reason = ""




        })

        /**
         * If POST was successful, retrieve new list of sleep
         */
        .then(() => {
            return SleepFactory.napList()
        })

        /**
         * Bind new list of sleep to scope so view gets updated
         */
        .then(sleep => {
            $scope.sleep = sleep
        })
    }
})


