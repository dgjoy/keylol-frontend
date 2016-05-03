(function () {
    keylolApp.filter('iconSvgUrl', () => {
        return function (input) {
            return `assets/images/sprite-a02ebec535.svg#${input}`;
        };
    });
}());
