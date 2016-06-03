(function () {
    class PointAssociationsController {
        showChineseSupport(event) {
            this.showChineseSupportPopup({
                templateUrl: 'src/popup/chinese-support.html',
                controller: 'ChineseSupportController as chineseSupport',
                event,
                attachSide: 'bottom',
                align: 'center',
                inputs: {
                    options: {
                        theme: this.theme,
                    },
                },
            });
        }
    }

    keylolApp.component('pointAssociations', {
        templateUrl: 'src/sections/point-associations.html',
        controller: PointAssociationsController,
        controllerAs: 'pointAssociations',
        bindings: {
            theme: '<',
        },
    });
}());
