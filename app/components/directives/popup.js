(function () {
    "use strict";

    keylolApp.directive("popup", [
        "window", "$timeout",
        function (window, $timeout) {
            return {
                restrict: "A",
                scope: {
                    showFn: "=popup"
                },
                link: function (scope, element) {
                    var contexts = {};
                    var objectReferences = [];
                    scope.showFn = function (optionsOverride) {
                        var options = {
                            attachSide: "top",
                            align: "center",
                            offsetX: 0,
                            offsetY: 0,
                            showDelay: 0,
                            closeDelay: 0
                        };
                        if (optionsOverride && optionsOverride.event) {
                            // Copy the event object because it may be changed.
                            // e.g. mouseenter event will be changed to mouseover after the its listener has been excuted.
                            optionsOverride.event = $.extend({}, optionsOverride.event);
                            if (optionsOverride.event.type === "mouseenter") {
                                options.showDelay = 500; // Change default delay for mouseenter trigger type
                                options.closeDelay = 500;
                            }
                        }
                        $.extend(options, optionsOverride);

                        if (options.event) {
                            var contextId = objectReferences.indexOf(options.event.currentTarget);
                            if (contexts[contextId]) {
                                contexts[contextId].show(true);
                                return;
                            }
                        }

                        var windowPromise, showTimeout, closeTimeout;

                        var close = function () {
                            if (showTimeout) {
                                $timeout.cancel(showTimeout);
                            } else {
                                closeTimeout = $timeout(function () {
                                    closeTimeout = null;

                                    windowPromise.then(function (window) {
                                        window.closeNow();
                                    });
                                }, options.closeDelay);
                            }
                        };

                        var show = function (cancelCloseOnly) {
                            if (closeTimeout) {
                                $timeout.cancel(closeTimeout);
                            } else if (!cancelCloseOnly) {
                                var onTriggerMouseLeave, contextId;

                                showTimeout = $timeout(function () {
                                    showTimeout = null;

                                    var position = element.offset();
                                    switch (options.attachSide) {
                                        case "bottom":
                                            switch (options.align) {
                                                case "left":
                                                    break;

                                                case "right":
                                                    break;

                                                default: // Center
                                                    break;
                                            }
                                            break;

                                        case "left":
                                            switch (options.align) {
                                                case "top":
                                                    break;

                                                case "bottom":
                                                    break;

                                                default: // Center
                                                    break;
                                            }
                                            break;

                                        case "right":
                                            switch (options.align) {
                                                case "top":
                                                    break;

                                                case "bottom":
                                                    break;

                                                default: // Center
                                                    break;
                                            }
                                            break;

                                        default: // Top
                                            switch (options.align) {
                                                case "left":
                                                    break;

                                                case "right":
                                                    break;

                                                default: // Center
                                                    break;
                                            }
                                            break;
                                    }

                                    windowPromise = window.show({
                                        template: options.template,
                                        templateUrl: options.templateUrl,
                                        controller: options.controller,
                                        adjustScrollBar: false,
                                        styles: {
                                            position: "fixed",
                                            top: "2px",
                                            left: "2px"
                                        }
                                    });

                                    if (options.event) {
                                        if (options.event.type === "click") {
                                            var onBodyClick;
                                            windowPromise.then(function (window) {
                                                onBodyClick = function (e) {
                                                    if (e.target === options.event.currentTarget ||
                                                        $.contains(options.event.currentTarget, e.target))
                                                        e.stopPropagation();
                                                    if (e.target !== window.$element[0] &&
                                                        !$.contains(window.$element[0], e.target))
                                                        close();
                                                };
                                                document.body.addEventListener("click", onBodyClick, true);
                                                return window.close;
                                            }).then(function () {
                                                document.body.removeEventListener("click", onBodyClick, true);
                                            });
                                        } else if (options.event.type === "mouseenter") {
                                            var onPopupMouseEnter = function () {
                                                show(true);
                                            };
                                            var onPopupMouseLeave = function () {
                                                close();
                                            };
                                            windowPromise.then(function (window) {
                                                window.$element.hover(onPopupMouseEnter, onPopupMouseLeave);
                                                window.close.then(function () {
                                                    delete contexts[contextId];
                                                    $(options.event.currentTarget).off("mouseleave", onTriggerMouseLeave);
                                                    window.$element.off("mouseenter", onPopupMouseEnter);
                                                    window.$element.off("mouseleave", onPopupMouseLeave);
                                                });
                                            });
                                        }
                                    }
                                }, options.showDelay);

                                if (options.event && options.event.type === "mouseenter") {
                                    onTriggerMouseLeave = function () {
                                        close();
                                    };
                                    $(options.event.currentTarget).mouseleave(onTriggerMouseLeave);
                                    contextId = objectReferences.indexOf(options.event.currentTarget);
                                    if (contextId === -1)
                                        contextId = objectReferences.push(options.event.currentTarget) - 1;
                                    contexts[contextId] = {
                                        show: show
                                    };
                                    showTimeout.catch(function () {
                                        delete contexts[contextId];
                                        $(options.event.currentTarget).off("mouseleave", onTriggerMouseLeave);
                                    });
                                }
                            }
                        };

                        show();
                    };
                }
            };
        }
    ]);
})();