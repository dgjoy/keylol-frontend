/**
 * Created by ZenDay on 2016/5/3.
 */
(function () {
    keylolApp.directive('ripple', ($timeout, utils) => {
        return {
            scope : {
                type: '@ripple',
            },
            restrict: 'A',
            link (scope, element) {
                let type, value;
                scope.$watch('type', newValue => {
                    const nValue = newValue || '#000';

                    if (nValue[0] === '#') {
                        type = 'color';
                        value = utils.hexToRgb(nValue).join();
                    } else if (nValue === 'disabled') {
                        type = 'disabled';
                    } else {
                        type = 'class';
                        value = nValue;
                    }
                });
                const $rippleContainer = $('<div class="ripple-container"></div>');
                element.append($rippleContainer);

                function func (e) {
                    let containerBgRestoreTimeout;

                    // Ripple
                    // Create ripple
                    const $ripple = $('<span class="ripple"><span class="circle"></span></span>');
                    const $circle = $ripple.find('.circle');

                    // Prepend ripple to element
                    $rippleContainer.prepend($ripple);

                    function getPointOffset(e) {
                        let x, y;
                        const eventType = e.type;

                        // get click coordinates by event type
                        if (eventType.lastIndexOf('mouse', 0) === 0) {
                            x = e.pageX;
                            y = e.pageY;
                        } else if (eventType.lastIndexOf('touch', 0) === 0) {
                            try {
                                let origEvent;

                                if (typeof e.changedTouches !== 'undefined') {
                                    origEvent = e.changedTouches[0];
                                } else {
                                    origEvent = e.originalEvent;
                                }

                                x = origEvent.pageX;
                                y = origEvent.pageY;
                            } catch (e) {
                                // fall back to center of el
                                x = ripple.offsetWidth / 2;
                                y = ripple.offsetHeight / 2;
                            }
                        }

                        // set new ripple position by click or touch position
                        function getPos(element) {
                            const de = document.documentElement;
                            const box = element.getBoundingClientRect();
                            const top = box.top + window.pageYOffset - de.clientTop;
                            const left = box.left + window.pageXOffset - de.clientLeft;
                            return { top, left };
                        }

                        const offsets = getPos(element[0]);
                        return {
                            left: x - offsets.left,
                            top: y - offsets.top,
                        };
                    }

                    function rippleSize(pointOffset) {
                        return Math.sqrt(
                            Math.pow(Math.max(Math.abs(element[0].offsetWidth - pointOffset.left), pointOffset.left) * 2, 2)
                            + Math.pow(Math.max(Math.abs(element[0].offsetHeight - pointOffset.top), pointOffset.top) * 2, 2));
                    }

                    const pointOffset = getPointOffset(e);

                    // Set ripple size
                    const size = rippleSize(pointOffset);

                    $ripple.css({
                        width: `${size}px`,
                        height: `${size}px`,
                        left: `${pointOffset.left - size / 2}px`,
                        top: `${pointOffset.top - size / 2}px`,
                    });

                    // Add animation effect
                    if (type === 'class') {
                        $rippleContainer.addClass(value);
                        $circle.addClass(value);
                    } else if (type === 'color') {
                        $rippleContainer.css('background-color', `rgba(${value}, 0.03)`);
                        $circle.css('background-color', `rgba(${value}, 0.08)`);
                    }
                    $circle.addClass('animate-appear');

                    const waitTimeOut = $timeout();

                    function removeAndUnbind() {
                        waitTimeOut.then(() => {
                            $circle.addClass('animate-disappear');
                            if (containerBgRestoreTimeout)
                                $timeout.cancel(containerBgRestoreTimeout);
                            containerBgRestoreTimeout = $timeout(() => {
                                if (type === 'class') {
                                    $rippleContainer.removeClass(value);
                                } else {
                                    $rippleContainer.css('background-color', 'transparent');
                                }
                            }, 645);
                            $timeout(() => {
                                $ripple.remove();
                            }, 900);
                        });
                        element.off('touchend touchleave mouseup mouseleave', removeAndUnbind);
                        element.off('touchmove mousemove', move);
                    }

                    let currentScale = 1;

                    function move(e) {
                        const newPointOffset = getPointOffset(e);
                        const newSize = rippleSize(newPointOffset);
                        if (newSize > size)
                            currentScale = newSize / size;
                        $ripple.css('transform', `translate(${newPointOffset.left - pointOffset.left}px,` +
                         `${newPointOffset.top - pointOffset.top}px) scale(${currentScale})`);
                    }

                    element.on('touchend touchleave mouseup mouseleave', removeAndUnbind);
                    element.on('touchmove mousemove', move);
                }

                element.on('touchstart mousedown', func);

                //remove the event listener on scope destroy
                scope.$on('$destroy',() => {
                    element.off('touchstart mousedown', func);
                });
            },
        };
    });
}());
