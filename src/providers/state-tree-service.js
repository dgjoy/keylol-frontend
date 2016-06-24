(function () {
    keylolApp.factory('stateTree', [
        '$localStorage', '$sessionStorage', '$rootScope',
        ($localStorage, $sessionStorage, $rootScope) => {
            return {
                empty: true,
            };
        },
    ]);
}());
