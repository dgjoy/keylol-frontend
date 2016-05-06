(function () {
    class TabsController {
        changeTab(index) {
            if (this.curTab === index)
                return ;
            
            this.curTab = index;
        }
    }

    keylolApp.component('tabs', {
        templateUrl: 'src/components/tabs.html',
        controller: TabsController,
        controllerAs: 'tabs',
        bindings:{
            tabArray: '<',
            curTab: '@',
        },
    });
}());
