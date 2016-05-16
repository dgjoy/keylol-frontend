(function () {
    class TextAreaController {
        constructor (stateTree, $http, apiEndpoint, notification, $scope) {
            $.extend(this, {
                stateTree,
                $http,
                apiEndpoint,
                notification,
                $scope,
            });
            this.model = '';
            if (this.model.length === 0) {
                this.fillState = false;
            }
            this.warnState = false;
            this.activeState = false;

            this.tip = '识唔识得啊';
            if (this.type === 'uic') {
                $scope.$watch(() => {
                    return this.model;
                },() => {
                    this.check();
                });
            }
        }

        focus() {
            this.activeState = true;
        }

        blur() {
            this.activeState = false;
            this.fillState = (this.model.length !== 0);
        }

        check() {
            if (this.model.length === 0) {
                this.warnState = false;
            } else {
                this.warnState = true;
            }
        }
    }

    keylolApp.component('textArea', {
        templateUrl: 'src/components/text-area.html',
        controller: TextAreaController,
        controllerAs: 'textArea',
        bindings: {
            type:'@',
            label:'@',
            model:'=',
        },
    });
}());
