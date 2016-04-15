(function () {
    keylolApp.provider("apiEndpoint", () => {
        let _apiEndpoint = "";
        return {
            setEndPoint (endpoint) {
                _apiEndpoint = endpoint;
            },
            $get: [
                function () {
                    return _apiEndpoint;
                },
            ],
        };
    });
}());
