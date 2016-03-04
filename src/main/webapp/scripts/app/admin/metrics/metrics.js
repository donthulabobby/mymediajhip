'use strict';

angular.module('mymediajhipApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('metrics', {
                parent: 'admin',
                url: '/appmetrics',
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'metrics.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/admin/metrics/metrics.html',
                        controller: 'MetricsController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('metrics');
                        return $translate.refresh();
                    }]
                }
            });
    });
