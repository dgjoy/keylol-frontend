(function () {
    keylolApp.filter('iconSvgUrl', () => {
        return function (input) {
            return `assets/images/sprite-16d3024f47.svg#${input}`;
        };
    });
}());
