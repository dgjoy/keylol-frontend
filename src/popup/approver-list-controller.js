(function () {
    class ApproverListController {
        constructor(content) {
            $.extend(this,{
               content,
            });
            
            this.pages = [[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3]];
            this.totalPage = this.pages.length;
            this.currentPage = 1;
            
            this.swapDirection = 'init';
        }
        
        changePage(newPage, oldPage) {
            this.currentPage = newPage;
            this.swapDirection = newPage < oldPage ? 'right' : 'left';
        }
    }

    keylolApp.controller('ApproverListController', ApproverListController);
}());
