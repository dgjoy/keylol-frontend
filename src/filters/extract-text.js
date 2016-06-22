(function () {
    keylolApp.filter('extractText', () => {
        return input => {
            let output = input;
            if (output) {
                output = output.replace(/<.*?>/gmi, ' ');
            }

            return output;
        };
    });
}());
