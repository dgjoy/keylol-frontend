(function () {
    keylolApp.filter('defaultFallback', ['$filter', $filter => {
        return (input, type) => {
            let fall_back = 'keylol://ae4fc6c26cea78f9e373bcee9ba67805.png';
            if (type === 'latest-articles') {
                fall_back = 'keylol://9967d808683cea0849dcbf07c3573cf7.jpg';
            } else if (type === 'media-center') {
                fall_back = 'keylol://733acb3c64b0f458dd951721863daa21.jpg';
            }
            return input ? input : fall_back;
        };
    }]);
}());
