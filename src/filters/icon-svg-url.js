(function () {
    keylolApp.filter('iconSvgUrl', () => {
        return function (input) {
            return `assets/images/sprite-bca4a0fb3a.svg#${input}`;
        };
    });
}());
