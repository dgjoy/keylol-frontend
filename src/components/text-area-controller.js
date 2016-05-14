(function () {
    class TextAreaController {
        constructor (stateTree, $http, apiEndpoint, notification) {
            $.extend(this, {
                stateTree,
                $http,
                apiEndpoint,
                notification,
            });

            this.active = false;
            this.value = '';
            if (this.value.length !== 0){
                this.filled = true;
            }

            this.defaultTip = '日常界面展示的称呼';
            this.tip = this.defaultTip;
            this.localWarn = false;
            this.locked = false;
        }

        focus() {
            this.active = true;
        }

        blur() {
            this.active = false;
            this.filled = (this.value.length !== 0);
        }

        localCheck() {
            if (this.value.length > 5) {
                this.localWarn = true;
                this.tip = '不得超过5个字符';
            } else {
                this.localWarn = false;
                this.tip = this.defaultTip;
            }
        }
    }

    keylolApp.component('textArea', {
        templateUrl: 'src/components/text-area.html',
        controller: TextAreaController,
        controllerAs: 'textArea',
    });
}());
