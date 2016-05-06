(function () {
    class tabsController {
        changeTab(index) {
            if (this.curTab === index)
                return ;
            
            this.curTab = index;
        }
    }

    keylolApp.component('tabs', {
        templateUrl: 'src/components/tabs.html',
        controller: tabsController,
        controllerAs: 'tabs',
        bindings:{
            tabArray: '<',
            curTab: '@',
        },
    });
}());
