(function () {
    "use strict";

    keylolApp.config([
        "apiEndpointProvider",
        function(apiEndpointProvider){
            apiEndpointProvider.setEndPoint("https://testflight-api.keylol.com/");
        }
    ]);

    window.apiEndpoint = "https://testflight-api.keylol.com/";
})();