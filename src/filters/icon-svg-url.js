(function () {
    keylolApp.filter('iconSvgUrl', () => {
        return function (input) {
            return `assets/images/sprite-df17784ccb.svg#${input}`;
        };
    });
}());
