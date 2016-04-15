(function () {
    keylolApp.filter("maxLength", () => {
        return (input, length) => {
            let output = input;
            if (output) {
                if (output.length > length) {
                    output = `${output.slice(0, length - 1)}…`;
                }
            }

            return output;
        };
    });
}());
