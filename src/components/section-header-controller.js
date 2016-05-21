(function () {
    class SectionHeaderController {
        constructor () {
            if (this.header) {
                if (!this.header.type) {
                    this.header.type = 'theme';
                }
            }
        }
    }

    keylolApp.component('sectionHeader', {
        templateUrl: 'src/components/section-header.html',
        controller: SectionHeaderController,
        controllerAs: 'sectionHeader',
        bindings: {
            header: '<',
            theme: '<',
        },
    });
}());
