var userName;
var withAccess = false;
var appName = "R d m z r";
var Application = angular.module('Application', ["ngRoute"]);

Application.config(function ($routeProvider, $locationProvider){
    $routeProvider
    .when("/", {
        controller: "homeCtrl",
        templateUrl: "Views/HomePage.html"
    })
    .when("/about", {
        controller: "aboutApp",
        templateUrl: "Views/About.html"
    })
    .when("/login", {
        controller: "appUsers",
        templateUrl: "Views/Login.html"
    })
    .when("/tracker", {
        controller: "taskTracker",
        templateUrl: "Views/TaskTracker.html"
    })
    .when("/noaccess", {
        controller: "noaccessCtrl",
        templateUrl: "Views/NotAuthorized.html"
    })
    .when("/random", {
        controller: "randomizerCtrl",
        templateUrl: "Views/Randomizer.html"
    })
    .otherwise({redirectTo:"/"})
});

Application.controller("appUsers", function ($scope, $location) {
    $scope.users = [{ name: 'Sample User', email: 'sample@abc.com', password: '123456' },
                    { name: 'Guia', email: 'gblara@sample.com', password: 'qazwsx' }];
    $scope.appName = appName;

    //Code block below is specifically for users that tend to type the link directly
    if (withAccess) {
        $location.path("/welcome");
    }

    $scope.checkUserLogin = function () {
        angular.forEach($scope.users, function (value, key) {
            if ($scope.email == value.email && $scope.password == value.password) {
                userName = value.name;
                withAccess = true;
            }
        });
        if (withAccess) {
            $location.path("/");
        } else {
            alert("Username or password is incorrect.");
        }
    }

});

Application.controller("taskTracker", function ($scope, $location) {
    $scope.username = userName;
    $scope.tasks = [];
    $scope.completed = [];
    $scope.appName = appName;

    //Code block below is specifically for users that tend to type the link directly
    if (!withAccess) {
        $location.path("/noaccess");
    }

    $scope.userlogout = function () {
        withAccess = false;
        $location.path("/login");
    }

    $scope.addTask = function () {
        if($scope.task != ""){
            $scope.tasks.unshift({ task: $scope.task });
        } else {
            alert("No Task Entered!");
        }
        $scope.task = "";
    }

    $scope.completeTask = function (task) {
        $scope.completed.unshift({ completeTask: task.task });
        var index = $scope.tasks.indexOf(task);
        $scope.tasks.splice(index, 1);
    }

    $scope.pendingTask = function (task) {
        $scope.tasks.unshift({ task: task.completeTask });
        var index = $scope.completed.indexOf(task);
        $scope.completed.splice(index, 1);
    }

    $scope.removeCompleted = function (task) {
        var index = $scope.completed.indexOf(task);
        $scope.completed.splice(index, 1);
    }

    $scope.removeInProgress = function (task) {
        var index = $scope.tasks.indexOf(task);
        $scope.tasks.splice(index, 1);
    }

    $scope.clearCompletedTasks = function () {
        $scope.completed = [];
    }

    $scope.clearTasks = function () {
        $scope.tasks = [];
    }
});

Application.controller("aboutApp", function ($scope, $location) {
    $scope.withAccess = withAccess;
    $scope.noAccess = !withAccess;
    $scope.username = userName;
    $scope.appName = appName;

    $scope.userlogout = function () {
        withAccess = false;
        $location.path("/login");
    }
});

Application.controller("homeCtrl", function ($scope, $location) {
    $scope.withAccess = withAccess;
    $scope.noAccess = !withAccess;
    $scope.username = userName;
    $scope.appName = appName;

    $scope.userlogout = function () {
        withAccess = false;
        $location.path("/login");
    }
});

Application.controller("noaccessCtrl", function ($scope, $location) {
    $scope.appName = appName;
    //Code block below is specifically for users that tend to type the link directly
    if (withAccess) {
        $location.path("/");
    }
});

Application.controller("randomizerCtrl", function ($scope, $location) {
    $scope.items = [];
    $scope.results = [];
    $scope.appName = appName;

    //Code block below is specifically for users that tend to type the link directly
    if (!withAccess) {
        $location.path("/noaccess");
    }

    $scope.userlogout = function () {
        withAccess = false;
        $location.path("/login");
    }

    $scope.randomize = function () {
        var arrIndex = Math.floor(Math.random() * $scope.items.length);
        var resultItem = $scope.items[arrIndex];
        $scope.results.push(resultItem);
        $scope.items.splice(arrIndex, 1);
    }

    $scope.addItem = function () {
        if ($scope.addedItem != "") {
            $scope.items.unshift($scope.addedItem);
            $scope.addedItem = "";
        } else {
            alert("No Item Entered!");
        }
    }

    $scope.removeResultItem = function (result) {
        var index = $scope.results.indexOf(result);
        $scope.results.splice(index, 1);
    }

    $scope.removeItem = function (item) {
        var index = $scope.items.indexOf(item);
        $scope.items.splice(index, 1);
    }

    $scope.clearResults = function () {
        $scope.results = [];
    }

    $scope.returnResults = function () {
        if($scope.results.length != 0){
            $scope.items = $scope.items.unshift($scope.results);
            $scope.results = [];
        }
    }

    $scope.clearItems = function () {
        $scope.items = [];
    }
});