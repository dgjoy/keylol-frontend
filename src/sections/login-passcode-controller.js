(function () {
    class LoginPasscodeController {
        constructor() {
            this.tabArray = [{
                name:'识别码',
                href:'',
            }, {
                name:'昵称',
                href:'',
            },{
                name:'电邮',
                href:'',
            }];

            this.curTab = 0;
        }
    }

    keylolApp.component('loginPasscode', {
        templateUrl: 'src/sections/login-passcode.html',
        controller: LoginPasscodeController,
        controllerAs: 'loginPasscode',
    });
}());
