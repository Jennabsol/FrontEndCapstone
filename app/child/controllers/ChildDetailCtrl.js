// this uses route parameter to request the employee and display the details
angular
    .module("babyMammaApp")
    .controller("ChildDetailCtrl",
        function ($scope, $location, $routeParams, ChildFactory, $timeout) {
            $scope.child = {}
            /**
             * Use the factory to get the details of a single employee
             */

            ChildFactory.single($routeParams.childId).then(child => {
                $scope.child = child

            })


            // $scope.getAge =
            // function (birthday) {
            //     birthday = new Date(birthday);
            //     let today = new Date();
            //     let age = ((today - birthday) / (31557600000));
            //     age = Math.floor(age);
            //     return age
            // }

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
                    $timeout()
                    $location.url("/");
                })


            }
        }
    )