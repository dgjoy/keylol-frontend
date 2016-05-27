(function () {
    class ItemEditorController {
        constructor(type, close, $http, theme) {
            $.extend(this, {
                $http,
                close,
                theme,
            });
        }
    }

    keylolApp.controller('ItemEditorController', ItemEditorController);
}());
