(function () {
    keylolApp.filter('iconSvgUrl', () => {
        return function (input) {
            return `assets/images/sprite-a0225b3068.svg#${input}`;
        };
    });
}());
