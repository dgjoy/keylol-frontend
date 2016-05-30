(function () {
    class FrontpageController {
        constructor ($scope, pageHead, stateTree, pageLoad) {
            pageHead.setTitle('据点 - 扉页 - 其乐');
            pageLoad('aggregation.point.frontpage');
        }
    }

    keylolApp.controller('FrontpageController', FrontpageController);
}());
