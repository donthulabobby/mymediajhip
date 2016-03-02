'use strict';

angular.module('mymediajhipApp')
    .factory('VideoSearch', function ($resource) {
        return $resource('api/_search/videos/:query', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });
