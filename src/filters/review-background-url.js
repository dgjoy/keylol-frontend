(function () {
    keylolApp.filter('reviewBackgroundUrl', ['$filter', $filter => {
        return input => {
            return $filter('uriRelocate')(input, 'article.point.background', 'keylol://e2d611b9650daf5c08d307f24cf8b308.jpg');
        };
    }]);
}());
