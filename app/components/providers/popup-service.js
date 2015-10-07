(function() {

	'use strict';

	keylolApp.factory('popup', [
		'$document', '$compile', '$controller', '$http', '$rootScope', '$q', '$templateCache',
		function($document, $compile, $controller, $http, $rootScope, $q, $templateCache) {

			function PopupService() {

				var self = this;

				//  Returns a promise which gets the template, either
				//  from the template parameter or via a request to the
				//  template url parameter.
				var getTemplate = function(template, templateUrl) {
					var deferred = $q.defer();
					if (template) {
						deferred.resolve(template);
					} else if (templateUrl) {
						// check to see if the template has already been loaded
						var cachedTemplate = $templateCache.get(templateUrl);
						if (cachedTemplate !== undefined) {
							deferred.resolve(cachedTemplate);
						}
						// if not, let's grab the template for the first time
						else {
							$http({ method: 'GET', url: templateUrl, cache: true })
								.then(function(result) {
									// save template into the cache and return the template
									$templateCache.put(templateUrl, result.data);
									deferred.resolve(result.data);
								}, function(error) {
									deferred.reject(error);
								});
						}
					} else {
						deferred.reject("No template or templateUrl has been specified.");
					}
					return deferred.promise;
				};

				self.show = function(options) {

					//  Create a deferred we'll resolve when the popup is ready.
					var deferred = $q.defer();

					//  Validate the input parameters.
					var controllerName = options.controller;
					if (!controllerName) {
						deferred.reject("No controller has been specified.");
						return deferred.promise;
					}

					//  If a 'controllerAs' option has been provided, we change the controller
					//  name to use 'as' syntax. $controller will automatically handle this.
					if (options.controllerAs) {
						controllerName = controllerName + " as " + options.controllerAs;
					}

					//  Get the actual html of the template.
					getTemplate(options.template, options.templateUrl)
						.then(function(template) {

							//  Create a new scope for the popup.
							var popupScope = $rootScope.$new();

							//  Create the inputs object to the controller - this will include
							//  the scope, as well as all inputs provided.
							//  We will also create a deferred that is resolved with a provided
							//  close function. The controller can then call 'close(result)'.
							//  The controller can also provide a delay for closing - this is
							//  helpful if there are closing animations which must finish first.
							var closeDeferred = $q.defer();
							var inputs = {
								$scope: popupScope,
								close: function(result, delay) {
									if (delay === undefined || delay === null) delay = 0;
									window.setTimeout(function() {
										//  Resolve the 'close' promise.
										closeDeferred.resolve(result);

										//  We can now clean up the scope and remove the element from the DOM.
										popupScope.$destroy();
										$popupElement.remove();

										//  Unless we null out all of these objects we seem to suffer
										//  from memory leaks, if anyone can explain why then I'd 
										//  be very interested to know.
										inputs.close = null;
										deferred = null;
										closeDeferred = null;
										popup = null;
										inputs = null;
										$popupElement = null;
										popupScope = null;
									}, delay);
								}
							};

							//  If we have provided any inputs, pass them to the controller.
							if (options.inputs) {
								for (var inputName in options.inputs) {
									inputs[inputName] = options.inputs[inputName];
								}
							}

							//  Parse the modal HTML into a DOM element (in template form).
							var popupElementTemplate = angular.element(template);

							//  Compile then link the template element, building the actual element.
							//  Set the $element on the inputs so that it can be injected if required.
							var linkFn = $compile(popupElementTemplate);
							var $popupElement = linkFn(popupScope);
							inputs.$element = $popupElement;

							//  Create the controller, explicitly specifying the scope to use.
							var popupController = $controller(controllerName, inputs);

							// append to body when no custom append element is specified
							$(document.body).append($popupElement);

							if(options.styles){
								$popupElement.css(options.styles);
							}

							//  We now have a modal object...
							var popup = {
								controller: popupController,
								scope: popupScope,
								element: $popupElement,
								close: closeDeferred.promise
							};

							//  ...which is passed to the caller via the promise.
							deferred.resolve(popup);

						})
						.then(null, function(error) { // 'catch' doesn't work in IE8.
							deferred.reject(error);
						});

					return deferred.promise;
				};
			}

			return new PopupService();
		}
	]);

}());