(function () {
    keylolApp.filter('iconSvgUrl', () => {
        return function (input) {
            return `assets/images/sprite-968282f18b.svg#${input}`;
        };
    });
}());
