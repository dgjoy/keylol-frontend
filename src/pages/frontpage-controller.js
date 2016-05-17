(function () {
    class FrontpageController {
        constructor ($scope, $rootScope, pageHead, loadResult, stateTree) {
            pageHead.setTitle('据点 - 扉页 - 其乐');

            stateTree.specialMenu = {
                header: {
                    type: 'point',
                },
                items: [
                    {
                        type: 'item',
                        icon: 'Register',
                        text: '杉果',
                    },
                    {
                        type: 'item',
                        icon: 'Register',
                        text: '杉果',
                    },
                    {
                        type: 'item',
                        icon: 'Register',
                        text: '杉果',
                    },
                ],
            };

            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('FrontpageController', FrontpageController);
}());
