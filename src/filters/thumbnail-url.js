(function () {
    keylolApp.filter('thumbnailUrl', ['$filter', $filter => {
        return function (input) {
            return $filter('uriRelocate')(input, '/both/120x45');
        };
    }]);
}());
