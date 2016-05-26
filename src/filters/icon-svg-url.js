(function () {
    keylolApp.filter('iconSvgUrl', () => {
        return function (input) {
            return `assets/images/sprite-21fa3c1da1.svg#${input}`;
        };
    });
}());
