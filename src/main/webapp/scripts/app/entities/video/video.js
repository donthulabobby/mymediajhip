'use strict';

angular.module('mymediajhipApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('video', {
                parent: 'entity',
                url: '/videos',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'mymediajhipApp.video.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/video/videos.html',
                        controller: 'VideoController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('video');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('video.detail', {
                parent: 'entity',
                url: '/video/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'mymediajhipApp.video.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/video/video-detail.html',
                        controller: 'VideoDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('video');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Video', function($stateParams, Video) {
                        return Video.get({id : $stateParams.id});
                    }]
                }
            })
            .state('video.new', {
                parent: 'video',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/video/video-dialog.html',
                        controller: 'VideoDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    video_name: null,
                                    language: null,
                                    added_by: null,
                                    date_added: null,
                                    video_location: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('video', null, { reload: true });
                    }, function() {
                        $state.go('video');
                    })
                }]
            })
            .state('video.edit', {
                parent: 'video',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/video/video-dialog.html',
                        controller: 'VideoDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Video', function(Video) {
                                return Video.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('video', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('video.delete', {
                parent: 'video',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/video/video-delete-dialog.html',
                        controller: 'VideoDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Video', function(Video) {
                                return Video.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('video', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
