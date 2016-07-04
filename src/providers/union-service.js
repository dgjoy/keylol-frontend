(function () {
    keylolApp.factory('union', [
        '$localStorage', '$sessionStorage', '$rootScope',
        ($localStorage, $sessionStorage, $rootScope) => {
            const union = {
                $localStorage,
                $sessionStorage,
            };
            const crossPageVariables = ['searchFilter', '$localStorage', '$sessionStorage'];
            $rootScope.$on('$stateChangeSuccess', () => {
                for (const member in union) {
                    if (union.hasOwnProperty(member) && crossPageVariables.indexOf(member) === -1) {
                        delete union[member];
                    }
                }
            });
            return union;
        },
    ]);
}());
