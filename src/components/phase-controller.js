(function () {
    class PhaseController {
    }

    keylolApp.component('phase', {
        templateUrl: 'src/components/phase.html',
        controller: PhaseController,
        controllerAs: 'phase',
        bindings: {
            phases:'<',
            index: '<',
            gapLength: '<',
        },
    });
}());
