(function () {
    class ActivityEditorController {
        constructor(close, options, stateTree, $http) {
            $.extend(this, {
                close,
                stateTree,
            });
            this.vm = {};
            this.extra = {};

            if (options.file) {
                this.extra.image = options.file;
            }
        }

        uploadImage($file) {
            if ($file) {
                this.extra.image = $file;
            }
        }
    }
    keylolApp.controller('ActivityEditorController', ActivityEditorController);
}());
