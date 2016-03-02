'use strict';

angular.module('mymediajhipApp')
    .controller('VideoDetailController', function ($scope, $rootScope, $stateParams, entity, Video, User) {
        $scope.video = entity;
        $scope.load = function (id) {
            Video.get({id: id}, function(result) {
                $scope.video = result;
            });
        };
        var unsubscribe = $rootScope.$on('mymediajhipApp:videoUpdate', function(event, result) {
            $scope.video = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
