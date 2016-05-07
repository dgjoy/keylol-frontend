(function () {
    class SectionHeaderController {}

    keylolApp.component('sectionHeader', {
        templateUrl: 'src/components/section-header.html',
        controller: SectionHeaderController,
        controllerAs: 'sectionHeader',
        bindings: {
            header: '<',
        },
    });
}());
