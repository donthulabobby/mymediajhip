 'use strict';

angular.module('mymediajhipApp')
    .factory('notificationInterceptor', function ($q, AlertService) {
        return {
            response: function(response) {
                var alertKey = response.headers('X-mymediajhipApp-alert');
                if (angular.isString(alertKey)) {
                    AlertService.success(alertKey, { param : response.headers('X-mymediajhipApp-params')});
                }
                return response;
            }
        };
    });
