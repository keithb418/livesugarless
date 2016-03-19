define((require) => {
    let angular = require('angular');
    let template = require('text!html/popups/message.html');
    
    angular.module('message', [])
        .factory('showMessage', ($uibModal, $uibModalStack) => {
            return (messageOpts) => {
                $uibModalStack.dismissAll();
                
                $uibModal.open({
                    template: template,
                    controller: 'messageCtrl',
                    resolve: {
                        messageOpts: () => {
                            return messageOpts;
                        }
                    }
                });
            }
        })
        .controller('messageCtrl', ($scope, $uibModalInstance, messageOpts) => {
            $scope.timeout = 15;
            $scope.units = "seconds";
            $scope.title = messageOpts.title;
            $scope.message = messageOpts.message;
            $scope.icon = messageOpts.icon;
            
            $scope.closeMessage = $uibModalInstance.close;
            
            let handleTimeout = () => {
                if (!$scope.timeout) {
                    $scope.closeMessage();
                } else {
                    setTimeout(() => {
                        $scope.timeout--;
                        $scope.units = $scope.timeout === 1 ? "second" : "seconds";
                        $scope.$apply();
                        handleTimeout();
                    }, 1000);
                }
            }
            
            handleTimeout();
        });
});