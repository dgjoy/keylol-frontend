(function () {
    class PointBasicInfoController {
        constructor (stateTree, utils) {
            if (this.point) {
                this.names = utils.getPreferredPointName(this.point, stateTree.currentUser);
            }
        }
    }

    keylolApp.component('pointBasicInfo', {
        templateUrl: 'src/components/point-basic-info.html',
        controller: PointBasicInfoController,
        controllerAs: 'pointBasicInfo',
        bindings: {
            point: '<',
            avatarVersion: '@',
        },
    });
}());
