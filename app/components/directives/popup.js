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
                                // Change default delay for mouseenter trigger type
                                options.showDelay = 350;
                                options.closeDelay = 400;
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

                                    if (!$.contains(document, element[0])) {
                                        if (options.event && options.event.type === "mouseenter") {
                                            delete contexts[contextId];
                                            $(options.event.currentTarget).off("mouseleave", onTriggerMouseLeave);
                                        }
                                        return;
                                    }

                                    windowPromise = window.show({
                                        template: options.template,
                                        templateUrl: options.templateUrl,
                                        controller: options.controller,
                                        adjustScrollBar: false,
                                        inputs: options.inputs
                                    });

                                    windowPromise.then(function (window) {
                                        var popupWidth = window.$element.innerWidth();
                                        var popupHeight = window.$element.innerHeight();
                                        window.$element.hide();
                                        var position = element.offset();
                                        var width = element.innerWidth();
                                        var height = element.innerHeight();

                                        if (options.attachSide === "left" || options.attachSide === "right") {
                                            switch (options.align) {
                                                case "top":
                                                    break;

                                                case "bottom":
                                                    position.top = position.top + height - popupHeight;
                                                    break;

                                                default: // Center
                                                    position.top = (2 * position.top + height - popupHeight) / 2;
                                                    break;
                                            }
                                            if (options.attachSide === "left") { // Left
                                                position.left -= popupWidth;
                                            } else { // Right
                                                position.left += width;
                                            }
                                        } else {
                                            switch (options.align) {
                                                case "left":
                                                    break;

                                                case "right":
                                                    position.left = position.left + width - popupWidth;
                                                    break;

                                                default: // Center
                                                    position.left = (2 * position.left + width - popupWidth) / 2;
                                                    break;
                                            }
                                            if (options.attachSide === "bottom") { // Bottom
                                                position.top += height;
                                            } else { // Top
                                                position.top -= popupHeight;
                                            }
                                        }
                                        position.left += options.offsetX;
                                        position.top += options.offsetY;
                                        window.$element.css(position);
                                        window.$element.show();
                                    });

                                    if (options.event) {
                                        var onBodyClick;
                                        if (options.event.type === "click") {
                                            windowPromise.then(function (window) {
                                                onBodyClick = function (e) {
                                                    if (e.target === options.event.currentTarget ||
                                                        $.contains(options.event.currentTarget, e.target)) {
                                                        if (options.event.acceptCurrentTarget)
                                                            return;
                                                        e.stopPropagation();
                                                    }
                                                    if (e.target !== window.$element[0] && !$.contains(window.$element[0], e.target))
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
                                                onBodyClick = function (e) {
                                                    if (e.target !== window.$element[0] && !$.contains(window.$element[0], e.target))
                                                        window.closeNow();
                                                };
                                                document.body.addEventListener("click", onBodyClick, true);
                                                window.$element.hover(onPopupMouseEnter, onPopupMouseLeave);
                                                window.close.then(function () {
                                                    delete contexts[contextId];
                                                    document.body.removeEventListener("click", onBodyClick, true);
                                                    $(options.event.currentTarget).off("mouseleave", onTriggerMouseLeave);
                                                    window.$element.off("mouseenter", onPopupMouseEnter);
                                                    window.$element.off("mouseleave", onPopupMouseLeave);
                                                });
                                            });
                                        }
                                    }
                                    return windowPromise;
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

                                return showTimeout.then(function (windowPromise) {
                                    return windowPromise;
                                });
                            }
                        };

                        return show();
                    };
                }
            };
        }
    ]);
})();