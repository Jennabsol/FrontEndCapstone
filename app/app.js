angular.module("babyMammaApp", ["ngRoute"])

const isAuth = AuthFactory => new Promise ((resolve, reject) => {
    if (AuthFactory.isAuthenticated()){
        console.log("User is authenticated, resolve route promise")
        resolve()
    } else {
        console.log("User is not authenticated, reject route promise")
        reject()
    }
})

angular.module("babyMammaApp").config(function ($routeProvider) {
    /**
     * Configure all Angular application routes here
     */
     /* Now that you have a partial, let's start using Angular routing to show it in the element with the
    ng-view attribute. First, we add an add in a new configuration object for our application, and set
    $routeProvider as a dependency. */
    $routeProvider
    // child list
        .when("/", {
            templateUrl: "app/child/partials/childList.html",
            controller: "ChildListCtrl",
            resolve: { isAuth }
        })
        .when("/child/list", {
            templateUrl: "app/child/partials/childList.html",
            controller: "ChildListCtrl",
            resolve: { isAuth }
        })
        // Adding a new child
        .when('/child/new', {
            templateUrl: 'app/child/partials/createChild.html',
            controller: 'ChildCreateCtrl',
            resolve: { isAuth }
        })
        /* Notice that the URL has a colon in front of childId. The colon is the magic.
        It tells Angular routing that anything located at that location in the URL should be captured
        and be made available in the $routeParams object that was injected into the controller.
        The new route binds the detail.html partial to the ChildDetailCtrl controller. */
        .when('/child/detail/:childId', {
            templateUrl: 'app/child/partials/childDetail.html',
            controller: 'ChildDetailCtrl',
            resolve: { isAuth }
        })
        .when("/sleep/list", {
            templateUrl: "app/sleep/partials/sleepList.html",
            controller: "SleepListCtrl",
            resolve: { isAuth }
        })
        .when('/sleep/start', {
            templateUrl: 'app/sleep/partials/startSleep.html',
            controller: 'SleepStartCtrl',
            resolve: { isAuth }
        })
        .when('/sleep/end/:napId', {
            templateUrl: 'app/sleep/partials/endSleep.html',
            controller: 'SleepEndCtrl',
            resolve: { isAuth }
        })
        .when('/sleep/detail/:napId', {
            templateUrl: 'app/sleep/partials/sleepDetail.html',
            controller: 'SleepDetailCtrl',
            resolve: { isAuth }
        })
        .when('/auth', {
            templateUrl: 'app/auth/partials/register.html',
            controller: 'AuthCtrl'
        })

          // Catch-all route
        /* If you want to redirect the user to a particular route if they enter one that you currently
        don't have a view for, you can use the otherwise method on the route provider.
         */
        .otherwise('/auth')
})