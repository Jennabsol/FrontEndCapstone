angular
    .module("babyMammaApp")
    .factory("SleepFactory", function ($http, AuthFactory) {
        return Object.create(null, {
            "cache": {
                value: null,
                writable: true
            },
            // SleepFactory.list returns all children which is used by ChildListCtrl
            "napList": {
                value: function () {
                    return $http({
                        method: "GET",
                        url: "https://babymomma-b6771.firebaseio.com/sleep/.json"
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

            // SleepFactory.single returns one chilc which is used by childDetailCtrl
            "singleNap": {
                value: function (key) {
                    return $http({
                        method: "GET",
                        url: `https://babymomma-b6771.firebaseio.com/sleep/${key}/.json`

                    }).then(response => {
                        return response.data
                    })
                }
            },

            // SleepFactory.delete deletes chilc from firebase
            "deleteNap": {
                value: function (key) {
                    console.log("inside the delete! 1st time")
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {
                            return $http({
                                method: "DELETE",
                                url: `https://babymomma-b6771.firebaseio.com/sleep/${key}/.json?auth=${idToken}`

                            })
                        }).catch(function (error) {
                            console.log("Error while deleting the article. Please try again.")
                        })
                }
            },
            // SleepFactory.fire updates the child info in firebase
            "edit": {
                value: function (nap, key) {
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {
                            return $http({
                                method: "PUT",
                                url: `https://babymomma-b6771.firebaseio.com/sleep/${key}/.json?auth=${idToken}`,
                                data: nap
                            })
                        }).catch(function (error) {
                            console.log("Error while updating the article. Please try again.")
                        })
                }
            },
            // SleepFactory.add adds new child to firebase which is used by ChildCreateCtrl
            "addStartNap": {
                value: function (nap) {
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {

                            return $http({
                                method: "POST",
                                url: `https://babymomma-b6771.firebaseio.com/sleep/.json?auth=${idToken}`,
                                data: {
                                    "location": nap.location,
                                    "Date": new Date(),
                                    "startTime": new Date(),
                                    "childId": nap.childId


                                }
                            })
                        }).catch(function (error) {
                            console.log("Error while adding the article. Please try again.")
                        })
                }
            },
            "addEndNap": {
                value: function (nap, key) {
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {

                            return $http({
                                method: "PATCH",
                                url: `https://babymomma-b6771.firebaseio.com/sleep/${key}/.json?auth=${idToken}`,
                                data: {

                                    "endTime": new Date(),
                                    "notes": nap.notes,
                                    "reason": nap.reason


                                }
                            })
                        }).catch(function (error) {
                            console.log("Error while adding the article. Please try again.")
                        })
                }
            }


        })

    })