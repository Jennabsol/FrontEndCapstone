angular
    .module("babyMammaApp")
    .factory("ChildFactory", function ($http, AuthFactory) {
        const uuidGenerator = function* () {
            while (true) {
                let time = new Date().getTime()
                let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (char) {
                    const random = (time + Math.random() * 16) % 16 | 0
                    return (char === 'x' ? random : (random & 0x3 | 0x8)).toString(16)
                })
                yield uuid
            }
        }

        // Create instance of generator
        const idGenerator = uuidGenerator()
        return Object.create(null, {
            "cache": {
                value: null,
                writable: true
            },
            // ChildFactory.list returns all children which is used by ChildListCtrl
            "list": {
                value: function () {
                    return $http({
                        method: "GET",
                        url: `https://babymomma-b6771.firebaseio.com/children/.json?orderBy="parentId"&equalTo="${AuthFactory.getUser().uid}"`
                    }).then(response => {
                        const data = response.data


                        this.cache = Object.keys(data).map(key => {
                            data[key].id = key
                            return data[key]
                        })

                        return this.cache
                    })
                }
            },

            // childFactory.single returns one chilc which is used by childDetailCtrl
            "single": {
                value: function (key) {
                    return $http({
                        method: "GET",
                        url: `https://babymomma-b6771.firebaseio.com/children/${key}/.json`

                    }).then(response => {
                        return response.data
                    })
                }
            },

            // ChildFactory.delete deletes chilc from firebase
            "delete": {
                value: function (key) {
                    console.log("inside the delete! 1st time")
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {
                            return $http({
                                method: "DELETE",
                                url: `https://babymomma-b6771.firebaseio.com/children/${key}/.json?auth=${idToken}`

                            })
                        }).catch(function (error) {
                            notify.log("Error while deleting the article. Please try again.")
                        })
                }
            },
            // ChildFactory.fire updates the child info in firebase
            "edit": {
                value: function (child, key) {
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {
                            return $http({
                                method: "PUT",
                                url: `https://babymomma-b6771.firebaseio.com/children/${key}/.json?auth=${idToken}`,
                                data: child
                            })
                        }).catch(function (error) {
                            notify.log("Error while updating the article. Please try again.")
                        })
                }
            },
            // ChildFactory.add adds new child to firebase which is used by ChildCreateCtrl
            "add": {
                value: function (child) {
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {
                           const user = firebase.auth().currentUser
                            return $http({
                                method: "POST",
                                url: `https://babymomma-b6771.firebaseio.com/children/.json?auth=${idToken}`,
                                data: {
                                    "name": child.name,
                                    "DOB": child.DOB,
                                    "parentId": user.uid,
                                    "childId": idGenerator.next().value
                                }
                            })
                        }).catch(function (error) {
                            notify.log("Error while adding the article. Please try again.")
                        })
                }
            },


        })

    })
/* A factory is responsible for data operations, and initializing data state. Controllers can then use
factories to get data, and manipulate it for a specific purpose, or representation. Since each controller
has its own scope, and another controller cannot access it, a factory acts as the intermediary, an escrow,
between controllers. */