angular.module("babyMammaApp").constant("FIREBASE_CONFIG", {
    apiKey: "AIzaSyA-3s3Mnxngw4e39Jy_VW8X0tgXQgWH5Dg",
    authDomain: "babymomma-b6771.firebaseapp.com",
    databaseURL: "https://babymomma-b6771.firebaseio.com",
    projectId: "babymomma-b6771",
    storageBucket: "babymomma-b6771.appspot.com",
    messagingSenderId: "27851297462"
})

angular.module("babyMammaApp").run(function (FIREBASE_CONFIG) {
    firebase.initializeApp(FIREBASE_CONFIG)
})

angular.module("babyMammaApp").config(['$sceDelegateProvider' , function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://api.forismatic.com/api/1.0/**',
        'http://127.0.0.1:8080/**'
    ]);
 }])