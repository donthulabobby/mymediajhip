'use strict';

angular.module('mymediajhipApp').controller('VideoDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Video', 'User',
        function($scope, $stateParams, $uibModalInstance, entity, Video, User) {

        $scope.video = entity;

        $scope.load = function(id) {
            Video.get({id : id}, function(result) {
                $scope.video = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('mymediajhipApp:videoUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
	    $scope.video.date_added = new Date();
            if ($scope.video.id != null) {
                Video.update($scope.video, onSaveSuccess, onSaveError);
            } else {
                Video.save($scope.video, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };

}]);
