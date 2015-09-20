(function () {
    "use strict";

    keylolApp.config([
        "apiEndpointProvider", "httpBatchConfigProvider", "$sceDelegateProvider",
        function (apiEndpointProvider, httpBatchConfigProvider, $sceDelegateProvider) {
            apiEndpointProvider.setEndPoint("https://testflight-api.keylol.com/");

            httpBatchConfigProvider.setAllowedBatchEndpoint("https://testflight-api.keylol.com/", "https://testflight-api.keylol.com/batch", {
                batchRequestCollectionDelay: 10
            });

            $sceDelegateProvider.resourceUrlWhitelist([
                "self",
                "https://keylol-static.b0.upaiyun.com/**"
            ]);
        }
    ]);
})();