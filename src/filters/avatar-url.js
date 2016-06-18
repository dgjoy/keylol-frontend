(function () {
    keylolApp.filter('avatarUrl', ['$filter', $filter => {
        return function (input, size, noFallback) {
            let sizeVersion;
            switch (size) {
                case 'large':
                    sizeVersion = '/sq/96';
                    break;

                case 'big':
                    sizeVersion = '/sq/48';
                    break;

                case 'small':
                    sizeVersion = '/sq/18';
                    break;

                default:
                    sizeVersion = '/sq/32';
                    break;
            }
            if (noFallback) return $filter('uriRelocate')(input, sizeVersion);
            return $filter('uriRelocate')(input, sizeVersion, 'keylol://df33d4fd29761f9a25ba31a991259532.png');
        };
    }]);
}());
