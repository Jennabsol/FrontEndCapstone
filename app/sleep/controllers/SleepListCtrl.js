angular
.module("babyMammaApp")
.controller("SleepListCtrl", function (SleepFactory, $scope) {
    $scope.Sleep = []

    /**
     * Use factory to get all children from Firebase
     */
    SleepFactory.napList().then(data => {



        $scope.Sleep = data
    })
})

// What this does is make Angular now watch the values URL in the browser, and when it changes,
// it tries to match the pattern /children/list. If it matches, it loads the HTML in our partial,
// and then binds that DOM to the ChildListCtrl controller.