(function () {
    keylolApp.filter('iconSvgUrl', () => {
        return function (input) {
            return `assets/images/sprite-def1874f21.svg#${input}`;
        };
    });
}());
