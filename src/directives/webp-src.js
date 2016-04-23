(function () {
    keylolApp.directive('webpSrc', ['utils', utils => {
        return {
            restrict: 'A',
            priority: 98,
            link (scope, element, attrs) {
                attrs.$observe('webpSrc', value => {
                    if (/\.svg|gif$/i.test(value)) {
                        attrs.$set('src', value);
                        return;
                    }
                    if (/^(?:http:|https:)?\/\/(storage|steamcdn)\.keylol\.com\//i.test(value))
                        utils.supportWebp.then(() => {
                            if (value.indexOf('!') === -1)
                                attrs.$set('src', `${value}!webp`);
                            else
                                attrs.$set('src', `${value}.webp`);
                        }, () => {
                            attrs.$set('src', value);
                        });
                    else
                        attrs.$set('src', value);
                });
            },
        };
    }]);
}());
