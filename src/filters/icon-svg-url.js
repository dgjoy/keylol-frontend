(function () {
    keylolApp.filter('iconSvgUrl', () => {
        return function (input) {
            return `assets/images/sprite-2e85974a4f.svg#${input}`;
        };
    });
}());
