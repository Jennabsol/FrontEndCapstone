angular
    .module("babyMammaApp")
    .controller("ChildCreateCtrl", function ($scope, ChildFactory, $timeout, $location) {
        $scope.newChild = {}

        /**
         * Use this event listener to check if there is any data
         * in the factory cache each time the user loads a view
         * that is bound to this controller
         */
        $scope.$on('$viewContentLoaded', function (event) {
            if (!ChildFactory.cache) {
                console.info("No cached data")
                ChildFactory.list(true).then(data => {
                    $scope.children = data
                })
            } else {
                console.info("Using cached data")
                $scope.children = ChildFactory.cache
            }
        })

        $scope.showMe = false;
        $scope.myFunc = function () {
            $scope.showMe = !$scope.showMe;
        }

        // when the button is pushed this creates on object
        $scope.addChild = function () {
            const child = {
                "name": $scope.newChild.name,
                "DOB": $scope.newChild.DOB
                // "parentID":


            }

            /**
             * Use the factory to POST to Firebase then clear
             */
            ChildFactory.add(child, "children").then(() => {
                    $scope.newChild.name = "",
                        $scope.newChild.DOB = null



                })

                /**
                 * If POST was successful, retrieve new list of children
                 */
                .then(() => {
                    return ChildFactory.list()
                })

                /**
                 * Bind new list of children to scope so view gets updated
                 */
                .then(children => {
                    $scope.children = children
                    $timeout()
                    $location.url("/");
                })
        }
    })