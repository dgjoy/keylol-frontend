(function () {
    class SwitchPaginationController {}

    keylolApp.component('switchPagination', {
        templateUrl: 'src/components/switch-pagination.html',
        controller: SwitchPaginationController,
        controllerAs: 'switchPagination',
        bindings: {
            current: '<',
            total: '<',
            next: '&',
            previous: '&',
        },
    });
}());
