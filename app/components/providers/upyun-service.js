(function () {
    "use strict";

    keylolApp.factory("upyun", [
        "$http", "base64", "Upload",
        function ($http, base64, Upload) {

            function UpyunService() {
                var self = this;

                self.policy = function () {
                    var options = {
                        bucket: "keylol",
                        "save-key": "{filemd5}{.suffix}",
                        expiration: Math.round(new Date().getTime() / 1000) + 300,
                        "content-length-range": "0,5242880"
                    };
                    return base64.encode(JSON.stringify(options));
                };

                self.signature = function (policy) {
                    return $http.post(apiEndpoint + "upload-signature", null, {params: {policy: policy}}).then(function (response) {
                        return response.data;
                    });
                };

                self.upload = function (file, policy, signature) {
                    return Upload.upload({
                        url: "//v0.api.upyun.com/keylol",
                        data: {
                            file: file,
                            policy: policy,
                            signature: signature
                        },
                        withCredentials: false
                    });
                };

                self.extractFileName = function (uri) {
                    var match = uri.match(/^(?:(?:(?:http:|https:)?\/\/keylol\.b0\.upaiyun\.com\/)|(?:keylol:\/\/))?([a-z0-9\.]+?)(?:!.*)?$/i);
                    if (match)
                        return match[1];
                };

                self.customVersionUrl = function (fileName, version) {
                    var url = "//keylol.b0.upaiyun.com/" + fileName;
                    if (version)
                        url += "!" + version;
                    return url;
                };
            }

            return new UpyunService();
        }
    ]);
})();