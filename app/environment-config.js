(function () {
    "use strict";

    keylolApp.config([
        "apiEndpointProvider", "httpBatchConfigProvider",
        function(apiEndpointProvider, httpBatchConfigProvider){
            apiEndpointProvider.setEndPoint("https://localhost/");

            httpBatchConfigProvider.setAllowedBatchEndpoint("https://localhost/", "https://localhost/batch", {
                batchRequestCollectionDelay: 10
            });
        }
    ]);
})();