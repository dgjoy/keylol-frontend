/**
 * Created by guihong on 4/27/16.
 */
(function() {
    class SpotlightController {}

    keylolApp.component('spotlight',{
        templateUrl: 'src/components/spotlight.html',
        controller: SpotlightController,
        controllerAs: 'spotlight',
        bindings: {
            info: '<',
        },
    });
}());