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
            this.warnState = false;
            this.activeState = false;

            $scope.$watch(() => {
                return this.state;
            },() => {
                this.warnState = (this.state === 'warn');
            });

            $scope.$watch(() => {
                return this.model;
            },() => {
                this.fillState = this.model && (this.model.length !== 0);
            });
        }

        focus() {
            this.activeState = true;
        }

        blur() {
            this.activeState = false;
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
