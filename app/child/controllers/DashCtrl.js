// this uses route parameter to request the child and display the details
angular
    .module("babyMammaApp")
    .controller("DashCtrl",
        function ($scope, $location, $routeParams, ChildFactory, $timeout) {
            $scope.child = {}
            /**
             * Use the factory to get single child
             */

            ChildFactory.single($routeParams.childId).then(child => {
                $scope.child = child

            })
        }
    )