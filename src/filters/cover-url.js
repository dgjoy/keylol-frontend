(function () {
    keylolApp.filter('coverUrl', ['$filter', $filter => {
        return (input, size) => {
            let sizeVersion;
            switch (size) {
                case 'big':
                    sizeVersion = 'cover.image.big';
                    break;

                default:
                    sizeVersion = 'cover.image.small';
                    break;
            }
            return $filter('uriRelocate')(input, sizeVersion);
        };
    }]);
}());
