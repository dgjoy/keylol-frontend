(function () {
    class DropdownSelectorController {
        constructor(object,close) {
            $.extend(this,{
                object,
                close,
            });
        }

        select(index) {
            this.close(this.object.items[index]);
        }

        cancel() {
            this.close('');
        }
    }

    keylolApp.controller('DropdownSelectorController', DropdownSelectorController);
}());
