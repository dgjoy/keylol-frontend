/**
 * Created by ZenDay on 2016/5/3.
 */
(function () {
    keylolApp.directive('parseStyle', $interpolate => {
        return (scope, elem) => {
            const exp = $interpolate(elem.html());

            scope.$watch(() => {
                return exp(scope);
            }, html => {
                elem.html(html);
            });
        };
    });
}());
