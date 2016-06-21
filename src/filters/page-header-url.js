(function () {
    keylolApp.filter('pageHeaderUrl', ['$filter', $filter => {
        return input => {
            return $filter('uriRelocate')(input, '/both/900x200');
        };
    }]);
}());
