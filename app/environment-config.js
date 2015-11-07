(function () {
    "use strict";

    keylolApp.config([
        "apiEndpointProvider",
        function(apiEndpointProvider){
            apiEndpointProvider.setEndPoint("https://api.keylol.com/");
        }
    ]);

    window.apiEndpoint = "https://api.keylol.com/";
    window.timeLineLoadCount = 50;
})();