angular
    .module("babyMammaApp")
    .controller("PoopAddCtrl", function ($scope, DiaperFactory, $location, $timeout, $route) {
        $scope.newPoopDiaper = {}

        /**
         * Use this event listener to check if there is any data
         * in the factory cache each time the user loads a view
         * that is bound to this controller
         */
        $scope.$on('$viewContentLoaded', function (event) {
            if (!DiaperFactory.cache) {
                console.info("No cached data")
                DiaperFactory.diaperList("poop", true).then(data => {
                    $scope.poop = data
                })
            } else {
                console.info("Using cached data")
                $scope.poop = DiaperFactory.cache
            }
        })
        $scope.showMe = false;
        $scope.myFunc = function () {
            $scope.showMe = !$scope.showMe;
        }

        // when the button is pushed this creates on object
        $scope.addPoop = function () {
            const diaper = {

                "childId": $scope.child.childId,
                "notes": $scope.newPoopDiaper.notes



            }

            /**
             * Use the factory to POST to Firebase then clear
             */
            DiaperFactory.addPoopDiaper(diaper, "poop").then((response) => {
                    $scope.newPoopDiaper.notes = ""
                    return response


                })

                /**
                 * If POST was successful, retrieve new list of poop
                 */
                .then(() => {
                    return DiaperFactory.diaperList("poop")
                })

                /**
                 * Bind new list of wet to scope so view gets updated
                 */
                .then(poop => {
                    $scope.poop = poop
                    $route.reload()
                })


        }
    })