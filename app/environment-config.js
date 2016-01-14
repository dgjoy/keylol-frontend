(function () {
    "use strict";

    keylolApp.config([
        "apiEndpointProvider",
        function(apiEndpointProvider){
            apiEndpointProvider.setEndPoint("https://localhost:44300/");
        }
    ]);

    window.apiEndpoint = "https://localhost:44300/";
})();