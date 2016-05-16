(function () {
    class DropdownSelectorController {
        constructor(content,close) {
            $.extend(this,{
                content,
                close,
            });
        }

        select(index) {
            this.close(this.content[index]);
        }

        cancel() {
            this.close('');
        }
    }

    keylolApp.controller('DropdownSelectorController', DropdownSelectorController);
}());
