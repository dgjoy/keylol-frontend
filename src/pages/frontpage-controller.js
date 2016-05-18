(function () {
    class FrontpageController {
        constructor ($scope, pageHead, stateTree) {
            pageHead.setTitle('据点 - 扉页 - 其乐');

            stateTree.specialMenu = {
                header: {
                    type: 'point',
                    voteStats: {
                        '1': 1,
                        '2': 0,
                        '3': 0,
                        '4': 0,
                        '5': 19,
                    },
                    totalEvaluate: 20,
                    votePercent: 9.5,
                    evaluate: 5,
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
