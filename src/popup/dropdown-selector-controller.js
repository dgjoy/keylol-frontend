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
    }

    keylolApp.controller('DropdownSelectorController', DropdownSelectorController);
}());
