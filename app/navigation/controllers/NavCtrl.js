angular.module("babyMammaApp").controller("NavCtrl",
    function ($scope, $location, AuthFactory, ChildFactory, $timeout, $rootScope) {
        /*
        Just a pass-through method to the AuthFactory method of the
        same name.
        */

        $rootScope.$on("authenticationSuccess", function () {
            $timeout()
            $scope.displayName = AuthFactory.getUser().displayName
       })

        $scope.isAuthenticated = () => AuthFactory.isAuthenticated();

        // Unauthenticate the client.

        $scope.logout = () => AuthFactory.logout();

    }

)