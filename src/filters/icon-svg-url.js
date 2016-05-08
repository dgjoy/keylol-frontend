(function () {
    keylolApp.filter('iconSvgUrl', () => {
        return function (input) {
            return `assets/images/sprite-06c873334e.svg#${input}`;
        };
    });
}());
