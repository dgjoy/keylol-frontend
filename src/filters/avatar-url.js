(function () {
    keylolApp.filter('avatarUrl', ['$filter', $filter => {
        return function (input, size) {
            let sizeVersion;
            switch (size) {
                case 'big':
                    sizeVersion = 'avatar.big';
                    break;

                case 'small':
                    sizeVersion = 'avatar.small';
                    break;

                default:
                    sizeVersion = 'avatar.medium';
                    break;
            }
            return $filter('uriRelocate')(input, sizeVersion, 'keylol://steam/avatars/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb');
        };
    }]);
}());
