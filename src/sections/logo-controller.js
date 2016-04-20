(function () {
    class LogoController {
        constructor ($rootScope, $location) {
            $.extend(this, {
                $rootScope,
                $location,
            });
        }
        emitRefresh () {
            if (this.$location.url() === "/") {
                this.$rootScope.$emit("homeRefresh");
            }
        };
    }

    keylolApp.component("logo", {
        templateUrl: "src/sections/logo.html",
        controller: LogoController,
        controllerAs: "logo",
    });
}());
