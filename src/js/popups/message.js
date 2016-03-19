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
            $scope.action1 = messageOpts.action1 || {};
            $scope.action2 = messageOpts.action2 || {};
            
            $scope.doAction1 = typeof $scope.action1.action === "function" ? $scope.action1.action : () => {};
            $scope.doAction2 = typeof $scope.action2.action === "function" ? $scope.action2.action : () => {};
            
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