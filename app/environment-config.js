(function () {
    "use strict";

    keylolApp.config([
        "apiEndpointProvider", "httpBatchConfigProvider",
        function(apiEndpointProvider, httpBatchConfigProvider){
            apiEndpointProvider.setEndPoint("https://testflight-api.keylol.com/");

            httpBatchConfigProvider.setAllowedBatchEndpoint("https://testflight-api.keylol.com/", "https://testflight-api.keylol.com/batch", {
                batchRequestCollectionDelay: 10
            });
        }
    ]);
})();