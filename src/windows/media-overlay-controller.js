(function () {
    class MediaOverlayController {
        constructor(list, currentPage) {
            $.extend(this,{
                list,
                currentPage,
            });
        }

        nextPage() {
            this.currentPage += 1;
        }

        previousPage() {
            this.currentPage -= 1;
        }

        showMenu($event) {
            this.showMenuPopup({
                templateUrl: 'src/popup/media-menu.html',
                controller: 'MediaMenuController as mediaMenu',
                event: $event,
                attachSide: 'right',
                align: 'top',
                offsetX: -220,
                offsetY: 0,
                inputs: {
                    actions:[null,null],
                },
            });
        }
    }
    keylolApp.controller('MediaOverlayController', MediaOverlayController);
}());
