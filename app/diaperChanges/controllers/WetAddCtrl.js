angular
    .module("babyMammaApp",)
    .controller("WetAddCtrl", function ($scope, DiaperFactory, $location, $timeout) {
        $scope.newWetDiaper = {}

        /**
         * Use this event listener to check if there is any data
         * in the factory cache each time the user loads a view
         * that is bound to this controller
         */
        $scope.$on('$viewContentLoaded', function (event) {
            if (!DiaperFactory.cache) {
                console.info("No cached data")
                DiaperFactory.diaperList("wet", true).then(data => {
                    $scope.wet = data
                })
            } else {
                console.info("Using cached data")
                $scope.wet = DiaperFactory.cache
            }
        })
        // when the button is pushed this creates on object
        $scope.addWet = function () {
            const diaper = {

                "childId": $scope.child.childId,
                "notes": $scope.newWetDiaper.notes



            }

            /**
             * Use the factory to POST to Firebase then clear
             */
            DiaperFactory.addWetDiaper(diaper, "wet").then((response) => {
                    $scope.newWetDiaper.notes = ""
                    return response


                })

                /**
                 * If POST was successful, retrieve new list of wet
                 */
                .then(() => {
                    return DiaperFactory.diaperList("wet")
                })

                /**
                 * Bind new list of wet to scope so view gets updated
                 */
                .then(wet => {
                    $scope.wet = wet
                })

        }
    })