(function () {
    class SourceListController {
        constructor(object) {
            $.extend(this,{
                object,
            });
        }
    }
    
    keylolApp.controller('SourceListController', SourceListController);
}());