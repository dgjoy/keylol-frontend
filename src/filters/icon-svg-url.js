(function () {
    keylolApp.filter('iconSvgUrl', () => {
        return function (input) {
            return `assets/images/sprite-1ffb52d4c8.svg#${input}`;
        };
    });
}());
