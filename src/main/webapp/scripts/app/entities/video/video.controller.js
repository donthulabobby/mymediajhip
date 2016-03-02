'use strict';

angular.module('mymediajhipApp')
    .controller('VideoController', function ($scope, $state, Video, VideoSearch) {

        $scope.videos = [];
        $scope.loadAll = function() {
            Video.query(function(result) {
               $scope.videos = result;
            });
        };
        $scope.loadAll();


        $scope.search = function () {
            VideoSearch.query({query: $scope.searchQuery}, function(result) {
                $scope.videos = result;
            }, function(response) {
                if(response.status === 404) {
                    $scope.loadAll();
                }
            });
        };

        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.video = {
                video_name: null,
                language: null,
                added_by: null,
                date_added: null,
                video_location: null,
                id: null
            };
        };
    });
