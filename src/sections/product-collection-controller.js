(function () {
    class ProductCollectionController {
        constructor () {
            this.list = [];
            if (this.count === undefined) {
                this.count = 0;
            }
            switch (this.type) {
                case 'vendor':
                    this.list.push({
                        header: {
                            mainTitle: '开发',
                            subTitle: `旗下 ${this.count} 部作品中有 ${this.object.developerProductCount} 部为其开发`,
                        },
                        cards: this.object.developerProducts,
                    });
                    this.list.push({
                        header: {
                            mainTitle: '发行',
                            subTitle: `旗下 ${this.count} 部作品中有 ${this.object.publisherProductCount} 部为其发行`,
                        },
                        cards: this.object.publisherProducts,
                    });
                    this.list.push({
                        header: {
                            mainTitle: '制造',
                            subTitle: `旗下 ${this.count} 部作品中有 ${this.object.manufacturerProductCount} 部为其制造`,
                        },
                        cards: this.object.manufacturerProducts,
                    });
                    this.list.push({
                        header: {
                            mainTitle: '代理',
                            subTitle: `旗下 ${this.count} 部作品中有 ${this.object.resellerProductCount} 部为其发行`,
                        },
                        cards: this.object.resellerProducts,
                    });
                    break;
                case 'platform':
                    this.list.push({
                        header: {
                            mainTitle: '平台',
                            subTitle: `共 ${this.count} 部作品`,
                        },
                        cards: this.object.platformProducts,
                    });
                    break;
                case 'category':
                    this.list.push({
                        header: {
                            mainTitle: '特性',
                            subTitle: `此类 ${this.count} 部作品中有 ${this.object.tagProductCount} 部属于此特性`,
                        },
                        cards: this.object.tagProducts,
                    });
                    this.list.push({
                        header: {
                            mainTitle: '系列',
                            subTitle: `此类 ${this.count} 部作品中有 ${this.object.seriesProductCount} 部属于此系列`,
                        },
                        cards: this.object.seriesProducts,
                    });
                    this.list.push({
                        header: {
                            mainTitle: '流派',
                            subTitle: `此类 ${this.count} 部作品中有 ${this.object.genreProductCount} 部属于此流派`,
                        },
                        cards: this.object.genreProducts,
                    });
                    break;
            }
        }
    }

    keylolApp.component('productCollection', {
        templateUrl: 'src/sections/product-collection.html',
        controller: ProductCollectionController,
        controllerAs: 'productCollection',
        bindings: {
            object: '<',
            type: '<',
            theme: '<',
            count: '<',
        },
    });
}());
