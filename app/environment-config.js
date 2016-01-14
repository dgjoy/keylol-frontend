(function () {
    "use strict";

    keylolApp.config([
        "apiEndpointProvider",
        function(apiEndpointProvider){
            apiEndpointProvider.setEndPoint("https://gay-api.keylol.com/");
        }
    ]);

    window.apiEndpoint = "https://gay-api.keylol.com/";
})();