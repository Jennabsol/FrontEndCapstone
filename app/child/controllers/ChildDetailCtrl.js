// this uses route parameter to request the child and display the details
angular
    .module("babyMammaApp")
    .controller("ChildDetailCtrl",
        function ($scope, $location, $routeParams, ChildFactory, $timeout) {

            /**
             * Use the factory to get the details of a single child
             */


            ChildFactory.single($routeParams.childId).then(child => {
                $scope.child = child

            })
            $scope.showMe = false;
            $scope.myFunc = function () {
                $scope.showMe = !$scope.showMe;
            }




            $scope.getAge =
                function (dateString) {
                    let today = new Date();
                    let birthDate = new Date(dateString);
                    let age = today.getFullYear() - birthDate.getFullYear();
                    let m = today.getMonth() - birthDate.getMonth();
                    let da = today.getDate() - birthDate.getDate();
                    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                        age--;
                    }
                    if (m < 0) {
                        m += 12;
                    }
                    if (da < 0) {
                        da += 30;
                    }
                    return age + " years " + Math.abs(m) + " months " + Math.abs(da) + " days";
                }

            /*

            /*
            This function is bound to an ng-click directive
            on the button in the view
            */
            $scope.deleteChild = function () {
                console.log("first time hitting delete")
                ChildFactory.delete($routeParams.childId).then(() => {

                    $location.url("/");
                    
                })


            }
        }
    )