angular
.module("babyMammaApp")
.controller("ChildListCtrl", function (ChildFactory, $scope) {
    $scope.children = []

    /**
     * Use factory to get all children from Firebase
     */
    ChildFactory.list().then(data => {



        $scope.children = data
    })
})

// What this does is make Angular now watch the values URL in the browser, and when it changes,
// it tries to match the pattern /children/list. If it matches, it loads the HTML in our partial,
// and then binds that DOM to the ChildListCtrl controller.