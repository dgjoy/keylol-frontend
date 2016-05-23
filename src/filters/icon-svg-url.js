(function () {
    keylolApp.filter('iconSvgUrl', () => {
        return function (input) {
            return `assets/images/sprite-1a88a4d9fc.svg#${input}`;
        };
    });
}());
