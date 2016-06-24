/**
 * Created by ZenDay on 2016/5/3.
 */
(function () {
    keylolApp.directive('elastic', ($timeout, $window) => {
        return {
            require: 'ngModel',
            restrict: 'A',
            link (scope, element, attrs, ngModel) {
                // cache a reference to the DOM element
                const ta = element[0];
                const $ta = element;

                // ensure the element is a textarea, and browser is capable
                if (ta.nodeName !== 'TEXTAREA' || !$window.getComputedStyle) {
                    return;
                }

                // set these properties before measuring dimensions
                $ta.css({
                    'overflow': 'hidden',
                    'overflow-y': 'hidden',
                    'word-wrap': 'break-word',
                });

                // force text reflow
                const text = ta.value;
                ta.value = '';
                ta.value = text;

                let taStyle = getComputedStyle(ta);
                let mirrored, active;
                let maxHeight = parseInt(taStyle.getPropertyValue('max-height'), 10);
                const append = attrs.elastic.replace(/\\n/g, '\n');
                const $win = angular.element($window);
                const mirrorInitStyle = 'position: absolute; top: -999px; right: auto; bottom: auto;' +
                    'left: 0; overflow: hidden; -webkit-box-sizing: content-box;' +
                    '-moz-box-sizing: content-box; box-sizing: content-box;' +
                    'min-height: 0 !important; height: 0 !important; padding: 0;' +
                    'word-wrap: break-word; border: 0;';
                const $mirror = angular.element(`<textarea aria-hidden="true" tabindex="-1" style="${mirrorInitStyle}"/>`).data('elastic', true);
                const mirror = $mirror[0];
                const resize = taStyle.getPropertyValue('resize');
                const borderBox = taStyle.getPropertyValue('box-sizing') === 'border-box' ||
                    taStyle.getPropertyValue('-moz-box-sizing') === 'border-box' ||
                    taStyle.getPropertyValue('-webkit-box-sizing') === 'border-box';
                const boxOuter = !borderBox ? { width: 0, height: 0 } : {
                    width: parseInt(taStyle.getPropertyValue('border-right-width'), 10) +
                    parseInt(taStyle.getPropertyValue('padding-right'), 10) +
                    parseInt(taStyle.getPropertyValue('padding-left'), 10) +
                    parseInt(taStyle.getPropertyValue('border-left-width'), 10),
                    height: parseInt(taStyle.getPropertyValue('border-top-width'), 10) +
                    parseInt(taStyle.getPropertyValue('padding-top'), 10) +
                    parseInt(taStyle.getPropertyValue('padding-bottom'), 10) +
                    parseInt(taStyle.getPropertyValue('border-bottom-width'), 10),
                };
                const minHeightValue = parseInt(taStyle.getPropertyValue('min-height'), 10);
                const heightValue = parseInt(taStyle.getPropertyValue('height'), 10);
                const minHeight = Math.max(minHeightValue, heightValue) - boxOuter.height;
                const copyStyle = [
                    'font-family',
                    'font-size',
                    'font-weight',
                    'font-style',
                    'letter-spacing',
                    'line-height',
                    'text-transform',
                    'word-spacing',
                    'text-indent',
                ];

                // exit if elastic already applied (or is the mirror element)
                if ($ta.data('elastic')) {
                    return;
                }

                // Opera returns max-height of -1 if not set
                maxHeight = maxHeight && maxHeight > 0 ? maxHeight : 9e4;

                // append mirror to the DOM
                if (mirror.parentNode !== document.body) {
                    angular.element(document.body).append(mirror);
                }

                // set resize and apply elastic
                $ta.css({
                    'resize': (resize === 'none' || resize === 'vertical') ? 'none' : 'horizontal',
                }).data('elastic', true);

                /*
                 * methods
                 */

                function initMirror() {
                    let mirrorStyle = mirrorInitStyle;

                    mirrored = ta;
                    // copy the essential styles from the textarea to the mirror
                    taStyle = getComputedStyle(ta);
                    angular.forEach(copyStyle, val => {
                        mirrorStyle += `${val}:${taStyle.getPropertyValue(val)};`;
                    });
                    mirror.setAttribute('style', mirrorStyle);
                }

                function adjust() {
                    let taHeight,
                        taComputedStyleWidth,
                        mirrorHeight,
                        width,
                        overflow;

                    if (mirrored !== ta) {
                        initMirror();
                    }

                    // active flag prevents actions in function from calling adjust again
                    if (!active) {
                        active = true;

                        mirror.value = ta.value + append; // optional whitespace to improve animation
                        mirror.style.overflowY = ta.style.overflowY;

                        taHeight = ta.style.height === '' ? 'auto' : parseInt(ta.style.height, 10);

                        taComputedStyleWidth = getComputedStyle(ta).getPropertyValue('width');

                        // ensure getComputedStyle has returned a readable 'used value' pixel width
                        if (taComputedStyleWidth.substr(taComputedStyleWidth.length - 2, 2) === 'px') {
                            // update mirror width in case the textarea width has changed
                            width = parseInt(taComputedStyleWidth, 10) - boxOuter.width;
                            mirror.style.width = `${width}px`;
                        }

                        mirrorHeight = mirror.scrollHeight;

                        if (mirrorHeight > maxHeight) {
                            mirrorHeight = maxHeight;
                            overflow = 'scroll';
                        } else if (mirrorHeight < minHeight) {
                            mirrorHeight = minHeight;
                        }
                        mirrorHeight += boxOuter.height;
                        ta.style.overflowY = overflow || 'hidden';

                        if (taHeight !== mirrorHeight) {
                            scope.$emit('elastic:resize', $ta, taHeight, mirrorHeight);
                            ta.style.height = `${mirrorHeight}px`;
                        }

                        // small delay to prevent an infinite loop
                        $timeout(() => {
                            active = false;
                        }, 1, false);
                    }
                }

                function forceAdjust() {
                    active = false;
                    adjust();
                }

                /*
                 * initialise
                 */

                // listen
                if ('onpropertychange' in ta && 'oninput' in ta) {
                    // IE9
                    ta.oninput = ta.onkeyup = adjust;
                } else {
                    ta.oninput = adjust;
                }

                $win.bind('resize', forceAdjust);

                scope.$watch(() => {
                    return ngModel.$modelValue;
                }, () => {
                    forceAdjust();
                });

                scope.$on('elastic:adjust', () => {
                    initMirror();
                    forceAdjust();
                });

                $timeout(adjust, 0, false);

                /*
                 * destroy
                 */

                scope.$on('$destroy', () => {
                    $mirror.remove();
                    $win.unbind('resize', forceAdjust);
                });
            },
        };
    });
}());
