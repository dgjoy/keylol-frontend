(function () {
    keylolApp.filter('iconSvgUrl', () => {
        return function (input) {
            return `assets/images/sprite-9e7161ecf5.svg#${input}`;
        };
    });
}());
