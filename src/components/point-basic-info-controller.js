(function () {
    class PointBasicInfoController {}

    keylolApp.component('pointBasicInfo', {
        templateUrl: 'src/components/point-basic-info.html',
        controller: PointBasicInfoController,
        controllerAs: 'pointBasicInfo',
        bindings: {
            text: '@',
        },
    });
}());
