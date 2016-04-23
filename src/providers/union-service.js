(function () {
    keylolApp.factory('union', [
        '$localStorage', '$sessionStorage', '$rootScope',
        ($localStorage, $sessionStorage, $rootScope) => {
            const union = {
                $localStorage,
                $sessionStorage,
            };
            $rootScope.$on('$routeChangeSuccess', () => {
                for (const member in union) {
                    delete union[member];
                }
                union.$localStorage = $localStorage;
                union.$sessionStorage = $sessionStorage;
            });
            return union;
        },
    ]);
}());
