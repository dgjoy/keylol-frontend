(function () {
    keylolApp.filter('calculatePercentage', () => {
        return number => {
            return `${Math.floor(number * 100)}%`;
        };
    });
}());
