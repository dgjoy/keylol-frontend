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
                let x, y, size, offsets, type, value;
                scope.$watch('type', newValue => {
                    const nValue = newValue || '#000';

                    if (nValue[0] === '#') {
                        type = 'color';
                        value = utils.hexToRgb(nValue).join();
                    } else {
                        type = 'class';
                        value = nValue;
                    }
                });
                const rippleContainer = document.createElement('div');
                rippleContainer.className += ' ripple-container';
                const $rippleContainer = $(rippleContainer);
                element.append(rippleContainer);

                function func (e) {
                    const eventType = e.type;
                    // Ripple
                    // Create ripple
                    const ripple = document.createElement('span');
                    ripple.className += ' ripple';
                    const $ripple = $(ripple);

                    // Prepend ripple to element
                    rippleContainer.insertBefore(ripple, rippleContainer.firstChild);

                    // Set ripple size
                    if (!ripple.offsetHeight && !ripple.offsetWidth) {
                        size = Math.max(element[0].offsetWidth, element[0].offsetHeight);
                        ripple.style.width = `${size}px`;
                        ripple.style.height = `${size}px`;
                    }

                    // Remove animation effect
                    ripple.className = ripple.className.replace(/ ?(animate)/g, '');

                    // get click coordinates by event type
                    if (eventType === 'mousedown') {
                        x = e.pageX;
                        y = e.pageY;
                    } else if (eventType === 'touchstart') {
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

                    offsets = getPos(element[0]);
                    ripple.style.left = `${x - offsets.left - size / 2}px`;
                    ripple.style.top = `${y - offsets.top - size / 2}px`;

                    // Add animation effect
                    if (type === 'class') {
                        $rippleContainer.addClass(value);
                        $ripple.addClass(value);
                    } else {
                        $rippleContainer.css('background-color', `rgba(${value}, 0.1)`);
                        $ripple.css('background-color', `rgba(${value}, 0.1)`);
                    }
                    ripple.className += ' animate-appear';

                    const waitTimeOut = $timeout();

                    function removeAndUnbind() {
                        waitTimeOut.then(() => {
                            if (type === 'class') {
                                $rippleContainer.removeClass(value);
                            } else {
                                $rippleContainer.css('background-color', 'transparent');
                            }
                            ripple.className += ' animate-disappear';
                            $timeout(() => {
                                $ripple.remove();
                            }, 500);
                        });
                        element.off('touchend touchleave mouseup mouseleave', removeAndUnbind);
                    }

                    element.on('touchend touchleave mouseup mouseleave', removeAndUnbind);
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