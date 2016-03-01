'use strict';

angular.module('mymediajhipApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


