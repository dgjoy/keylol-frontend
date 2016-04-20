(function () {
    keylolApp.factory("upyun", [
        "$http", "base64", "Upload",
        ($http, base64, Upload) => {
            function UpyunService() {
                const self = this;

                self.policy = function () {
                    const options = {
                        bucket: "keylol",
                        "save-key": "{filemd5}{.suffix}",
                        expiration: Math.round(new Date().getTime() / 1000) + 120,
                        "content-length-range": "0,5242880",
                    };
                    return base64.encode(JSON.stringify(options));
                };

                self.signature = function (policy) {
                    return $http.post(`${apiEndpoint}upload-signature`, null, { params: { policy } }).then(response => {
                        return response.data;
                    });
                };

                self.upload = function (file, policy, signature) {
                    return Upload.upload({
                        url: "//v0.api.upyun.com/keylol",
                        data: {
                            file,
                            policy,
                            signature,
                        },
                        withCredentials: false,
                    });
                };
            }

            return new UpyunService();
        },
    ]);
}());
