(function () {
    keylolApp.filter('iconSvgUrl', () => {
        return function (input) {
            return `assets/images/sprite-a41619b7d2.svg#${input}`;
        };
    });
}());
