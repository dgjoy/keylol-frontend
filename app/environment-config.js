(function () {
    "use strict";

    keylolApp.config([
        "apiEndpointProvider", "httpBatchConfigProvider",
        function(apiEndpointProvider, httpBatchConfigProvider){
            apiEndpointProvider.setEndPoint("https://localhost:44300/");

            httpBatchConfigProvider.setAllowedBatchEndpoint("https://localhost:44300/", "https://localhost:44300/batch", {
                batchRequestCollectionDelay: 10
            });
        }
    ]);

    window.apiEndpoint = "https://localhost:44300/";
})();