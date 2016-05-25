(function () {
    class PointEditSectionController {
        constructor () {
            this.showPopups = [];
        }

        showEditPopup ($event, $index) {
            this.showPopups[$index]({
                templateUrl: 'src/popup/item-editor.html',
                controller: 'ItemEditorController as itemEditor',
                event: $event,
                attachSide: 'left',
                align: 'top',
                offsetX: 39,
                offsetY: -40,
                inputs: {
                    type: 'text',
                },
            });
        }
    }

    keylolApp.component('pointEditSection', {
        templateUrl: 'src/sections/point-edit-section.html',
        controller: PointEditSectionController,
        controllerAs: 'pointEditSection',
        bindings: {
            theme: '<',
            object: '<',
        },
    });
}());
