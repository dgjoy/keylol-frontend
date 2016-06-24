(function () {
    class ImagePreviewController {
        constructor(close, imageSrc) {
            $.extend(this,{
                close,
            });
            
            this.imageSrc = imageSrc;
        }
        
        cancel() {
            const close = this.close;
            
            close();
        }
    }
    keylolApp.controller('ImagePreviewController', ImagePreviewController);
}());
