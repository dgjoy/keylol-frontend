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

            $scope.$watch(() => {
                return this.state;
            },() => {
                this.warnState = (this.state === 'warn');
            });
        }

        focus() {
            this.activeState = true;
        }

        blur() {
            this.activeState = false;
            this.fillState = (this.model.length !== 0);
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
            state:'<',//normal,warn,locked
            tip:'<',
        },
    });
}());
