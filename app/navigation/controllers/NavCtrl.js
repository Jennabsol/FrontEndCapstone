angular.module("babyMammaApp").controller("NavCtrl",
    function ($scope, $location, AuthFactory, ChildFactory, $timeout) {
        /*
        Just a pass-through method to the AuthFactory method of the
        same name.
        */
        function userName() {
            let user = firebase.auth().currentUser

            $scope.user = user.displayName

        }
        $timeout(userName,500)
        $scope.isAuthenticated = () => AuthFactory.isAuthenticated();

        // Unauthenticate the client.

        $scope.logout = () => AuthFactory.logout();

    }

)