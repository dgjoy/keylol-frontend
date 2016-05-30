(function () {
    class PointCreateSuccessController {
        constructor(close, pointObject) {
            $.extend(this, {
                close,
                pointObject,
            });
        }
    }

    keylolApp.controller('PointCreateSuccessController', PointCreateSuccessController);
}());
