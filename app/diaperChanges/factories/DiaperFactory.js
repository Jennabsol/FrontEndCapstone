angular
    .module("babyMammaApp")
    .factory("DiaperFactory", function ($http, AuthFactory, ChildFactory) {
        const firebaseURL = "https://babymomma-b6771.firebaseio.com/"
        return Object.create(null, {
            "cache": {
                value: null,
                writable: true
            },
            // DiaperFactory.list returns all children which is used by ChildListCtrl
            "diaperList": {
                value: function (areaInDb) {
                    return $http({
                        method: "GET",
                        url: `${firebaseURL+areaInDb}/.json`
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

            // DiaperFactory.single returns one chilc which is used by childDetailCtrl
            "singleDiaper": {
                value: function (areaInDb, key) {
                    return $http({
                        method: "GET",
                        url: `${firebaseURL+areaInDb}/${key}/.json`

                    }).then(response => {
                        return response.data
                    })
                }
            },

            // DiaperFactory.delete deletes chilc from firebase
            "deleteDiaper": {
                value: function (areaInDb, key) {
                    console.log("inside the delete! 1st time")
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {
                            return $http({
                                method: "DELETE",
                                url: `${firebaseURL+areaInDb}/${key}/.json?auth=${idToken}`

                            })
                        }).catch(function (error) {
                            console.log("Error while deleting the diaper. Please try again.")
                        })
                }
            },
            // DiaperFactory.fire updates the child info in firebase
            "editDiaper": {
                value: function (diaper, areaInDb, key) {
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {
                            return $http({
                                method: "PUT",
                                url: `${firebaseURL+areaInDb}/${key}/.json?auth=${idToken}`,
                                data: diaper
                            })
                        }).catch(function (error) {
                            console.log("Error while updating the diaper. Please try again.")
                        })
                }
            },
            // DiaperFactory.add adds new child to firebase which is used by ChildCreateCtrl
            "addWetDiaper": {
                value: function (diaper) {
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {

                            return $http({
                                method: "POST",
                                url: `https://babymomma-b6771.firebaseio.com/wet/.json?auth=${idToken}`,
                                data: {
                                    "date": new Date(),
                                    // "wetId": idGenerator.next().value,
                                    "notes": diaper.notes,
                                    "childId": diaper.childId


                                }
                            })
                        }).catch(function (error) {
                            console.log("Error while adding the wet diaper. Please try again.")
                        })
                }
            },
            "addPoopDiaper": {
                value: function (diaper) {
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {

                            return $http({
                                method: "POST",
                                url: `https://babymomma-b6771.firebaseio.com/poop/.json?auth=${idToken}`,
                                data: {
                                    "date": new Date(),
                                    // "poopId": idGenerator.next().value,
                                    "notes": diaper.notes,
                                    "childId": diaper.childId


                                }
                            })
                        }).catch(function (error) {
                            console.log("Error while adding the poop diaper. Please try again.")
                        })
                }
            }



        })

    })