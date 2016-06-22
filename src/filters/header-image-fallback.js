(function () {
    keylolApp.filter('headerImageFallback', ['$filter', $filter => {
        return (input, type) => {
            if (!input) {
                return {
                    user: 'keylol://4b588e38d811ac31be63be5835c2f71d.jpg',
                    game: 'keylol://05fe8398a92920133a6d19be859a84b5.jpg',
                    vendor: 'keylol://44d25f29481e7156db37431a3942a418.jpg',
                    platform: 'keylol://beec8dd58f207daccf88143e3df90372.jpg',
                    category: 'keylol://1253e8594b3629de4a1a8053233848fb.jpg',
                }[type];
            } else {
                return input;
            }
        };
    }]);
}());
