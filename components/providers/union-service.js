(function () {
    "use strict";

    keylolApp.factory("union", [
        "$localStorage", "$sessionStorage", "$rootScope",
        function ($localStorage, $sessionStorage, $rootScope) {
            var union = {
                $localStorage: $localStorage,
                $sessionStorage: $sessionStorage
            };
            $rootScope.$on("$routeChangeSuccess", function () {
                for (var member in union) delete union[member];
                union.$localStorage = $localStorage;
                union.$sessionStorage = $sessionStorage;
            });
            return union;
        }
    ]);
})();