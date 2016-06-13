(function () {
    keylolApp.filter('iconSvgUrl', () => {
        return function (input) {
            return `assets/images/sprite-39d7b7b5bf.svg#${input}`;
        };
    });
}());
