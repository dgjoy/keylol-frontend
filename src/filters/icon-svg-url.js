(function () {
    keylolApp.filter('iconSvgUrl', () => {
        return function (input) {
            return `assets/images/sprite-11ea8629de.svg#${input}`;
        };
    });
}());
