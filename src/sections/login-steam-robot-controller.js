(function () {
    class LoginSteamRobotController {
        constructor() {
            this.phaseIndex = 1;
        }
    }

    keylolApp.component('loginSteamRobot', {
        templateUrl: 'src/sections/login-steam-robot.html',
        controller: LoginSteamRobotController,
        controllerAs: 'loginSteamRobot',
    });
}());
