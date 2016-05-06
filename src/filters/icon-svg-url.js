(function () {
    keylolApp.filter('iconSvgUrl', () => {
        return function (input) {
            return `assets/images/sprite-a73b9f249f.svg#${input}`;
        };
    });
}());
