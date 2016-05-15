(function () {
    class LoginApiController {
        constructor() {
            this.phaseIndex = 0;
        }
    }

    keylolApp.component('loginApi', {
        templateUrl: 'src/sections/login-api.html',
        controller: LoginApiController,
        controllerAs: 'loginApi',
    });
}());
