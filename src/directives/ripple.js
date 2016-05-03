/**
 * Created by ZenDay on 2016/5/3.
 */
(function () {
    keylolApp.directive('ripple', () => {
        return {
            restrict: 'A',
            link (scope, element) {
                let x, y, size, offsets;

                function func (e) {
                    let ripple = this.querySelector('.ripple');
                    const eventType = e.type;
                    // Ripple
                    if (ripple === null) {
                        // Create ripple
                        ripple = document.createElement('span');
                        ripple.className += ' ripple';

                        // Prepend ripple to element
                        this.insertBefore(ripple, this.firstChild);

                        // Set ripple size
                        if (!ripple.offsetHeight && !ripple.offsetWidth) {
                            size = Math.max(element[0].offsetWidth, element[0].offsetHeight);
                            ripple.style.width = `${size}px`;
                            ripple.style.height = `${size}px`;
                        }
                    }

                    // Remove animation effect
                    ripple.className = ripple.className.replace(/ ?(animate)/g, '');

                    // get click coordinates by event type
                    if (eventType === 'mouseup') {
                        x = e.pageX;
                        y = e.pageY;
                    } else if (eventType === 'touchend') {
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
                    ripple.className += ' animate';
                }

                element.on('touchend mouseup', func);

                //remove the event listener on scope destroy
                scope.$on('$destroy',() => {
                    element.off('touchend mouseup', func);
                });
            },
        };
    });
}());