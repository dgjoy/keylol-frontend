(function () {
    class ItemEditorController {
        constructor(type, close, $http) {
            $.extend(this, {
                $http,
                close,
            });
        }
    }

    keylolApp.controller('ItemEditorController', ItemEditorController);
}());
