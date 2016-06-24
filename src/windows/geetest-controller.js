(function () {
    class GeetestController {
        constructor(close, utils, $timeout) {
            const geetest = utils.createGeetest('embed');
            this.geetestId = geetest.id;
            geetest.ready.then(gee => {
                $timeout(() => {
                    gee.appendTo(`#gee-${geetest.id}`);
                });
            });

            geetest.success.then(gee => {
                close(gee.getValidate());
            });
        }
    }
    keylolApp.controller('GeetestController', GeetestController);
}());
