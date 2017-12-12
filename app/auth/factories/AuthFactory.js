angular.module("babyMammaApp")
    .factory("AuthFactory", function ($http, $timeout, $location, $route) {
        let currentUserData = null

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                currentUserData = user

                if ($location.url() !== "/child/list") {
                    $timeout(function () {
                        $location.url("/child/list")
                    }, 100)
                } else {
                    $route.reload()
                }

            } else {
                currentUserData = null
                console.log("User is not authenticated")
                $timeout(function () {
                    $location.url("/auth")
                }, 100)
            }
        })

        return Object.create(null, {
            isAuthenticated: {
                value: () => {
                    const user = currentUserData
                    return user ? true : false
                }
            },
            getUser: {
                value: () => firebase.auth().currentUser
            },
            logout: {
                value: () => firebase.auth().signOut()
            },
            authenticate: {
                value: credentials =>
                    firebase.auth()
                    .signInWithEmailAndPassword(
                        credentials.email,
                        credentials.password
                    )
            },
            registerWithEmail: {
                value: user =>
                    firebase.auth()
                    .createUserWithEmailAndPassword(
                        user.email,
                        user.password
                    ).then(u => u.updateProfile({
                        displayName: user.name,
                    }))
            }
        })
    })