(function () {
    class SearchEngineController {
        constructor ($stateParams) {
            this.$stateParams = $stateParams;
        }
    }

    keylolApp.component('searchEngine', {
        templateUrl: 'src/sections/search-engine.html',
        controller: SearchEngineController,
        controllerAs: 'searchEngine',
    });
}());
