'use strict';

angular.module('mymediajhipApp')
    .factory('Video', function ($resource, DateUtils) {
        return $resource('api/videos/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.date_added = DateUtils.convertDateTimeFromServer(data.date_added);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    });
