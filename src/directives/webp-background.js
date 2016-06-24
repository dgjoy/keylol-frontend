(function () {
    keylolApp.directive('webpBackground', ['utils', utils => {
        return {
            restrict: 'A',
            priority: 98,
            link (scope, element, attrs) {
                attrs.$observe('webpBackground', value => {
                    if (!value) {
                        return;
                    }

                    if (/\.svg|gif$/i.test(value)) {
                        element.css('background-image', `url(${value})`);
                        return;
                    }
                    
                    if (/^(?:http:|https:)?\/\/(storage|steamcdn)\.keylol\.com\//i.test(value)) {
                        utils.supportWebp.then(() => {
                            if (value.indexOf('!') === -1) {
                                element.css('background-image', `url(${value}!/format/webp)`);
                            } else {
                                element.css('background-image', `url(${value}/format/webp)`);
                            }
                        }, () => {
                            element.css('background-image', `url(${value})`);
                        });
                    } else {
                        element.css('background-image', `url(${value})`);
                    }
                });
            },
        };
    }]);
}());
