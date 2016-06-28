(function () {
    keylolApp.filter('articleCoverUrl', ['$filter', $filter => {
        return input => {
            return $filter('uriRelocate')(input, '/both/425x250');
        };
    }]);
}());
