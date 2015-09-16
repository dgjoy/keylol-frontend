(function () {
    "use strict";

    keylolApp.config([
        "apiEndpointProvider",
        function(apiEndpointProvider){
            apiEndpointProvider.setEndPoint("http://localhost:38328/");
        }
    ]);
})();