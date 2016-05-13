(function () {
    class TabsController {
        changeTab(index) {
            if (this.curTab === index)
                return ;
            
            this.curTab = index;
            if (this.tabArray[index].click) {
                this.tabArray[index].click();
            }
        }
    }

    keylolApp.component('tabs', {
        templateUrl: 'src/components/tabs.html',
        controller: TabsController,
        controllerAs: 'tabs',
        bindings:{
            tabArray: '<',
            curTab: '<',
        },
    });
}());
