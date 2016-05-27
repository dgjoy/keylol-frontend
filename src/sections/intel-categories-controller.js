(function () {
    class IntelCategoriesController {
        constructor () {
            this.types = [
                {
                    mainTitle: '流派',
                    subTitle: '从游戏性质出发的分类方式',
                },
                {
                    mainTitle: '特性',
                    subTitle: '游戏中的要素和特色',
                },
            ];
        }
    }

    keylolApp.component('intelCategories', {
        templateUrl: 'src/sections/intel-categories.html',
        controller: IntelCategoriesController,
        controllerAs: 'intelCategories',
        bindings: {
            theme: '<',
            genre: '<',
            cate: '<',
        },
    });
}());
