(function () {
    keylolApp.filter('numberAbbreviation', () => {
        return input => {
            let output = input;
            if (output) {
                if (output > 999999999) {
                    output = `${parseInt(output / 1000000000)}B`;
                } else if (output > 999999) {
                    output = `${parseInt(output / 1000000)}M`;
                } else if (output > 999) {
                    output = `${parseInt(output / 1000)}K`;
                }
            }

            return output;
        };
    });
}());
