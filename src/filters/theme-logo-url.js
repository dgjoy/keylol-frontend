(function () {
    keylolApp.filter('themeLogoUrl', ['$filter', $filter => {
        return function (input) {
            return $filter('uriRelocate')(input, '/fxfn/250x60');
        };
    }]);
}());
