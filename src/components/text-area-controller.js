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
            this.disabledState = (this.state === 'disabled');

            //为 point 设定的属性
            this.pointCache = false;

            $scope.$watch(() => {
                return this.state;
            }, newValue => {
                this.disabledState = (newValue === 'disabled');
                this.warnState = (newValue === 'warn');
            });
        }

        focus() {
            this.activeState = true;
        }

        blur() {
            this.activeState = false;
        }

        cacheHandler(isEmpty) {
            this.pointCache = !isEmpty;
        }
    }

    keylolApp.component('textArea', {
        templateUrl: 'src/components/text-area.html',
        controller: TextAreaController,
        controllerAs: 'textArea',
        bindings: {
            type:'@',
            label:'@',
            object:'<',
            model:'=',
            state:'<',//normal,warn,disabled
            tip:'<',
            error:'<',
            limit:'<',
            theme:'<',
        },
    });
}());
