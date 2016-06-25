(function () {
    class ArchivedHeaderController {
        constructor ($window) {
            $.extend(this, {
                $window,
            });
        }
        
        back () {
            this.$window.history.back();
        }
    }

    keylolApp.component('archivedHeader', {
        templateUrl: 'src/components/archived-header.html',
        controller: ArchivedHeaderController,
        controllerAs: 'archivedHeader',
        bindings: {
            type: '@',
        },
    });
}());
