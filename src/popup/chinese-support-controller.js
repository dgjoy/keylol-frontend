(function () {
    class ChineseSupportController {
        constructor(options) {
            if (options.theme !== undefined)
                this.theme = options.theme;
        }
    }

    keylolApp.controller('ChineseSupportController', ChineseSupportController);
}());