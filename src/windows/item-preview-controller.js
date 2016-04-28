(function () {
    class ItemPreviewController {
        constructor(close, window, union, item) {
            $.extend(this,{
                close,
                window,
            });

            this.union = union;
            this.item = item;
        }

        cancel() {
            const close = this.close;

            close();
        }

        preview() {
            const window = this.window;

            window.show({
                templateUrl: 'src/windows/image-preview.html',
                controller: 'ImagePreviewController',
                controllerAs: 'ImagePreview',
                inputs: { imageSrc: this.item.PreviewImage },
            });
        }

        redeem() {
            const close = this.close;
            const window = this.window;

            close();
            window.show({
                templateUrl: 'src/windows/shop-collect.html',
                controller: 'ShopCollectController',
                controllerAs: 'ShopCollect',
                inputs: { item: this.item },
            });
        }
    }

    keylolApp.controller('ItemPreviewController', ItemPreviewController);
}());
