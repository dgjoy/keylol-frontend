(function () {
    keylolApp.filter('userName', () => {
        return (input, showAt) => {
            if (showAt) {
                return `@${input}`;
            } else {
                return input;
            }
        };
    });
}());
