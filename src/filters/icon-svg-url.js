(function () {
    keylolApp.filter('iconSvgUrl', () => {
        return function (input) {
            return `assets/images/sprite-fd31d3a392.svg#${input}`;
        };
    });
}());
