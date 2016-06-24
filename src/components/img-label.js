/**
 * Created by ZenDay on 2016/5/3.
 */
(function () {
    class ImgLabelController {
        constructor ($scope) {
            $scope.$watch(() => {
                return this.type;
            }, newValue => {
                if (newValue) {
                    switch (this.type) {
                        case 'libraried':
                            this.icon = 'libraried-mark';
                            this.text = '已在库';
                            break;
                        case 'friended':
                            this.icon = 'friended-mark';
                            break;
                    }
                }
            });
        }
    }

    keylolApp.component('imgLabel', {
        templateUrl: 'src/components/img-label.html',
        controller: ImgLabelController,
        controllerAs: 'imgLabel',
        bindings: {
            type: '@',
            hasText: '<',
        },
    });
}());
