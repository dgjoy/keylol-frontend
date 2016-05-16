(function () {
    keylolApp.factory('window', [
        '$compile', '$controller', '$rootScope', '$q', '$window', '$templateRequest', '$timeout', '$animate', '$animateCss',
        ($compile, $controller, $rootScope, $q, $window, $templateRequest, $timeout, $animate, $animateCss) => {
            function WindowService() {
                const self = this;

                let bodyOriginalPaddingRight;
                function scrollBarWidth () {
                    const scrollDiv = document.createElement('div');
                    scrollDiv.className = 'scrollbar-measure';
                    $(document.body).append(scrollDiv);
                    const width = scrollDiv.offsetWidth - scrollDiv.clientWidth;
                    $(scrollDiv).remove();
                    return width;
                }

                function adjustScrollBar () {
                    const $body = $(document.body);
                    if ($body.find('main[ui-view] > window').length > 0) {
                        if (!$body.hasClass('body-window-open')) {
                            bodyOriginalPaddingRight = document.body.style.paddingRight || '';

                            // Test if body is overflowing
                            let fullWindowWidth = $window.innerWidth;
                            if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
                                const documentElementRect = document.documentElement.getBoundingClientRect();
                                fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
                            }
                            if (document.body.clientWidth < fullWindowWidth) { // Body is overflowing
                                // Set body padding-right
                                const bodyPaddingRight = parseInt(($body.css('padding-right') || 0), 10);
                                $body.css('padding-right', `${bodyPaddingRight + scrollBarWidth()}px`);
                            }

                            $body.addClass('body-window-open');
                        }
                    } else {
                        if ($body.hasClass('body-window-open')) {
                            $body.css('padding-right', bodyOriginalPaddingRight);
                            $body.removeClass('body-window-open');
                        }
                    }
                }

                function centerPointFor (targetRect) {
                    return targetRect ? {
                        x: Math.round(targetRect.left + (targetRect.width / 2)),
                        y: Math.round(targetRect.top + (targetRect.height / 2)),
                    } : { x : 0, y : 0 };
                }

                self.show = preOptions => {
                    const options = $.extend({
                        adjustScrollBar: true,
                        global: false,
                        delayAppend: false,
                    }, preOptions);

                    //  Create a deferred we'll resolve when the window is ready.
                    const deferred = $q.defer();

                    //  If a 'controllerAs' option has been provided, we change the controller
                    //  name to use 'as' syntax. $controller will automatically handle this.
                    let controllerName = options.controller;
                    if (options.controllerAs) {
                        controllerName = `${controllerName} as ${options.controllerAs}`;
                    }

                    function create (template) {
                        const scope = $rootScope.$new();
                        const linkFn = $compile(template);
                        const $element = linkFn(scope);
                        let fromTransform, $windowElement;
                        if (options.styles) {
                            $element.css(options.styles);
                        }

                        const closeDeferred = $q.defer();
                        function close (result) {
                            cancelListen();
                            //  Resolve the 'close' promise.
                            closeDeferred.resolve(result);
                            if (options.event && fromTransform) {
                                $animateCss($element, {
                                    to: {
                                        opacity: 0,
                                    },
                                    transitionStyle: 'opacity 300ms cubic-bezier(0.4, 0.0, 0.2, 1)',
                                }).start();

                                $animateCss($windowElement, {
                                    from: {
                                        transform: 'translate(0, 0) scale(1)',
                                    },
                                    to: {
                                        transform: fromTransform,
                                    },
                                    transitionStyle: 'transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1)',
                                }).start().then(() => {
                                    elementLeave();
                                });
                            } else {
                                elementLeave();
                            }

                            function elementLeave() {
                                $animate.leave($element).then(() => {
                                    //  We can now clean up the scope and remove the element from the DOM.
                                    scope.$destroy();
                                    if (options.adjustScrollBar)
                                        adjustScrollBar();
                                });
                            }
                        }

                        const cancelListen = $rootScope.$on('$locationChangeSuccess', () => {
                            close();
                        });

                        const inputs = {
                            $element,
                            close,
                            $scope: scope,
                        };

                        //  If we have provided any inputs, pass them to the controller.
                        if (options.inputs) {
                            $.extend(inputs, options.inputs);
                        }

                        //  Create the controller, explicitly specifying the scope to use.
                        let controller;
                        if (controllerName)
                            controller = $controller(controllerName, inputs);

                        // Append
                        function appendWindow () {
                            const main = options.global ? document.body : $('main[ui-view]')[0];
                            const enterPromise = $animate.enter($element, main, main.lastChild);
                            if (options.adjustScrollBar)
                                adjustScrollBar();

                            if (options.event) {
                                $element.addClass('window-hidden');
                                enterPromise.then(() => {
                                    $timeout(() => {
                                        $windowElement = angular.element($element[0].querySelector('.window'));
                                        const targetRect = {
                                            height: options.event.target.offsetHeight,
                                            width: options.event.target.offsetWidth,
                                            left: options.event.target.offsetLeft,
                                            top: options.event.target.offsetTop,
                                        };
                                        const elementRect = {
                                            height: $windowElement[0].offsetHeight,
                                            width: $windowElement[0].offsetWidth,
                                            left: $windowElement[0].offsetLeft,
                                            top: $windowElement[0].offsetTop,
                                        };

                                        const dialogCenterPt = centerPointFor(elementRect);
                                        const targetCenterPt = centerPointFor(targetRect);

                                        fromTransform = `translate( ${targetCenterPt.x - dialogCenterPt.x}px,` +
                                            ` ${targetCenterPt.y - dialogCenterPt.y}px)` +
                                            ` scale( ${Math.round(100 * Math.min(0.5, targetRect.width / elementRect.width)) / 100},` +
                                            `${Math.round(100 * Math.min(0.5, targetRect.height / elementRect.height)) / 100} )`;

                                        $animateCss($element, {
                                            to: {
                                                opacity: 1,
                                            },
                                            transitionStyle: 'opacity 300ms cubic-bezier(0.4, 0.0, 0.2, 1)',
                                        }).start();

                                        $animateCss($windowElement, {
                                            from: {
                                                transform: fromTransform,
                                            },
                                            to: {
                                                transform: 'translate(0, 0) scale(1)',
                                            },
                                            transitionStyle: 'transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1)',
                                        }).start();
                                    });
                                });
                            }

                            deferred.resolve({
                                controller,
                                $element,
                                scope,
                                close: closeDeferred.promise,
                                closeNow: close,
                            });
                        }

                        if (options.delayAppend)
                            $timeout(appendWindow);
                        else
                            appendWindow();
                    }

                    if (options.template) {
                        create(options.template);
                    } else if (options.templateUrl) {
                        $templateRequest(options.templateUrl).then(result => {
                            create(result);
                        });
                    }

                    return deferred.promise;
                };
            }

            return new WindowService();
        },
    ]);
}());
