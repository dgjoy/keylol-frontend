(function () {
    class LoginPasscodeController {
        constructor($scope) {
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
            this.swapDirection = 'init';
        }
        changeTab(index) {
            if (index > this.curTab) {
                this.swapDirection = 'left';
                this.curTab = index;
            } else if (index < this.curTab) {
                this.swapDirection = 'right';
                this.curTab = index;
            }
        }
    }

    keylolApp.component('loginPasscode', {
        templateUrl: 'src/sections/login-passcode.html',
        controller: LoginPasscodeController,
        controllerAs: 'loginPasscode',
    });
}());
