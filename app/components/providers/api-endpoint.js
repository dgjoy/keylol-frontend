(function() {
	"use strict";

	keylolApp.provider("apiEndpoint", function() {
		var _apiEndpoint = "";
		return {
			setEndPoint: function(endpoint) {
				_apiEndpoint = endpoint;
			},
			$get: [
				function() {
					return _apiEndpoint;
				}
			]
		};
	});
})();