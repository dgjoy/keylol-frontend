(function () {
    class DropdownSelectorController {
        constructor(object,close) {
            $.extend(this,{
                object,
                close,
            });
        }

        select(index) {
            this.close(index);
        }

        cancel() {
            this.close(undefined);
        }
    }

    keylolApp.controller('DropdownSelectorController', DropdownSelectorController);
}());
