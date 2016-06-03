(function () {
    keylolApp.filter('iconSvgUrl', () => {
        return function (input) {
            return `assets/images/sprite-14f22a2430.svg#${input}`;
        };
    });
}());
