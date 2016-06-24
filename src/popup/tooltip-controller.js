(function () {
    class TooltipController {
        constructor(content) {
            $.extend(this,{
               content,
            });
        }
    }

    keylolApp.controller('TooltipController', TooltipController);
}());
