angular
    .module("babyMammaApp")
    .controller("SleepStartCtrl", function ($scope, SleepFactory, $location, $timeout) {
        $scope.newNap = {}

        /**
         * Use this event listener to check if there is any data
         * in the factory cache each time the user loads a view
         * that is bound to this controller
         */
        $scope.$on('$viewContentLoaded', function (event) {
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
        $scope.showMe = false;
        $scope.myFunc = function () {
            $scope.showMe = !$scope.showMe;
        }

        // when the button is pushed this creates on object
        $scope.startNap = function () {
            const nap = {

                "childId": $scope.child.childId,
                "location": $scope.newNap.location



            }

            /**
             * Use the factory to POST to Firebase then clear
             */
            SleepFactory.addStartNap(nap, "sleep").then((response) => {
                    $scope.newNap.location = ""
                    return response


                })

                /**
                 * If POST was successful redirect to endsleep
                 */
                .then((res) => {
                    $scope.sleep = SleepFactory.napList()
                    $location.url(`/sleep/end/${res.data.name}`)
                    console.log(res)
                })




        }
    })