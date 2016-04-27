/**
 * Created by guihong on 4/27/16.
 */
(function(){
    class spotlightController {
        constructor() {
            
        }

    }

    keylolApp.component('spotlight',{
        templateUrl:'src/components/spotlight.html',
        controller:spotlightController,
        controllerAs:'spotlight',
        bindings:{
            info:'<',
        },
    });
    
}());