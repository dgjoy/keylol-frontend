(function () {
    class DossierHomeController {
        constructor ($scope, pageHead, stateTree) {
            pageHead.setTitle('个人 - 档案 - 其乐');

            stateTree.specialMenu = {
                header: {
                    type:'dossier',
                },
            };

            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('DossierHomeController', DossierHomeController);
}());
