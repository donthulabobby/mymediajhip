'use strict';

angular.module('mymediajhipApp')
    .controller('VideoController', function ($scope, $state, Video, VideoSearch, $sce) {

        $scope.videos = [];
        $scope.loadAll = function() {
            Video.query(function(result) {
               $scope.videos = result;
            });
        };
        this.config = {
                preload: "none",
                sources: [
//                    {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.mp4"), type: "video/mp4"},
					//{src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.webm"), type: "video/webm"},
                //    {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.ogg"), type: "video/ogg"}
					  {src: $sce.trustAsResourceUrl("/myMediaFiles/sampleTestVid.mp4"), type: "video/mp4"}                    
                ],
                tracks: [
                    {
                        src: "http://www.videogular.com/assets/subs/pale-blue-dot.vtt",
                        kind: "subtitles",
                        srclang: "en",
                       label: "English",
                        default: ""
                    }
                ],
                theme: {
                    url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
                },
        		plugins: {
        			controls: {
        			autoHide: true,
        			autoHideTime: 3000
        			}
        		}
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
//    .config(function($scope){
//        preload: "none",
//        sources: [
//            {src: $scope.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.mp4"), type: "video/mp4"},
//            {src: $scope.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.webm"), type: "video/webm"},
//            {src: $scope.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.ogg"), type: "video/ogg"}
//        ],
//        tracks: [
//            {
//                src: "http://www.videogular.com/assets/subs/pale-blue-dot.vtt",
//                kind: "subtitles",
//                srclang: "en",
//               label: "English",
//                default: ""
//            }
//        ],
//        theme: {
//            url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
//        }
//    });
