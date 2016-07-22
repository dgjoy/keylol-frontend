(function () {
    class GoodDetailController {
        constructor(close, good, stateTree ,$sce) {
            $.extend(this,{
                close,
                good,
                stateTree,
            });
            this.limit = $sce.trustAsHtml(good.limit);
        }
    }
    keylolApp.controller('GoodDetailController', GoodDetailController);
}());
