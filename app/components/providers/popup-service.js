(function () {
    "use strict";

    keylolApp.factory("popup", [
        "$compile", "$controller", "$rootScope", "$q", "$templateRequest", "$timeout",
        function ($compile, $controller, $rootScope, $q, $templateRequest, $timeout) {
            return {
                show: function (options) {
                    //  Create a deferred we'll resolve when the popup is ready.
                    var deferred = $q.defer();

                    //  If a 'controllerAs' option has been provided, we change the controller
                    //  name to use 'as' syntax. $controller will automatically handle this.
                    var controllerName = options.controller;
                    if (options.controllerAs) {
                        controllerName = controllerName + " as " + options.controllerAs;
                    }

                    var create = function (template) {
                        var scope = $rootScope.$new();
                        var linkFn = $compile(template);
                        var $element = linkFn(scope);

                        if (options.styles) {
                            $element.css(options.styles);
                        }

                        var closeDeferred = $q.defer();
                        var inputs = {
                            $scope: scope,
                            $element: $element,
                            close: function (result, delay) {
                                if (delay === undefined || delay === null) delay = 0;
                                $timeout(function () {
                                    //  Resolve the 'close' promise.
                                    closeDeferred.resolve(result);

                                    //  We can now clean up the scope and remove the element from the DOM.
                                    scope.$destroy();
                                    $element.remove();
                                }, delay);
                            }
                        };

                        //  If we have provided any inputs, pass them to the controller.
                        if (options.inputs) {
                            $.extend(inputs, options.inputs);
                        }

                        //  Create the controller, explicitly specifying the scope to use.
                        var controller = $controller(controllerName, inputs);

                        // Append to body
                        $(document.body).append($element);

                        deferred.resolve({
                            controller: controller,
                            scope: scope,
                            $element: $element,
                            close: closeDeferred.promise
                        });
                    };

                    if (options.template) {
                        create(options.template)
                    } else if (options.templateUrl) {
                        $templateRequest(options.templateUrl).then(function (result) {
                            create(result);
                        });
                    }

                    return deferred.promise;
                }
            };
        }
    ]);
})();