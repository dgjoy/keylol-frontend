(function () {
    keylolApp.filter('iconSvgUrl', () => {
        return function (input) {
            return `assets/images/sprite-7f78a0c151.svg#${input}`;
        };
    });
}());
