(function () {
    class StoreGameCardController {
        constructor(utils, stores, stateTree) {
            this.stateTree = stateTree;
            this.subscribeSet = [
                {
                    text: '订阅',
                    type: 'theme',
                },
                {
                    text: '退订',
                    type: 'light-text',
                },
            ];
            this.subscribe = utils.subscribe;
            this.openRegistration = utils.openRegistration;

            this.stores = [];

            if (this.card.steamAppId) {
                const steamItem = {
                    icon: 'dtb-steam',
                    discount: this.card.steamDiscountedPrice ? `${parseInt((this.card.steamPrice - this.card.steamDiscountedPrice) / this.card.steamPrice * 100)}%` : undefined,
                    link: `http://store.steampowered.com/app/${this.card.steamAppId}`,
                };
                if (this.card.steamPrice) {
                    steamItem.price = `¥ ${this.card.steamPrice}`;
                } else if (this.card.steamPrice === 0) {
                    steamItem.price = '免费';
                }

                if (this.card.steamDiscountedPrice) {
                    steamItem.price = `¥ ${this.card.steamDiscountedPrice}`;
                }

                this.stores.push(steamItem);
            }

            if (this.card.sonkwoProductId) {
                const sonkwoItem = {
                    icon: 'dtb-sonkwo',
                    link: `https://www.sonkwo.com/products/${this.card.sonkwoProductId}`,
                };
                if (this.card.sonkwoPrice) {
                    sonkwoItem.price = `¥ ${this.card.sonkwoPrice}`;
                } else if (this.card.sonkwoPrice === 0) {
                    sonkwoItem.price = '免费';
                }
                this.stores.push(sonkwoItem);
            }

            for (let i = 2;i !== stores.length; i++) {
                if (this.card[`${stores[i].prefix}Link`] && this.card[`${stores[i].prefix}Link`] !== '') {
                    this.stores.push({
                        icon: stores[i].icon,
                        price: this.card[`${stores[i].prefix}Price`],
                        link: this.card[`${stores[i].prefix}Link`],
                    });
                }
            }
            if (this.stores.length > 3) {
                this.stores = this.stores.slice(0,2);
                this.stores.push({
                    icon: 'more' ,
                    link: `point/${this.card.idCode}`,
                });
            }
        }
    }

    keylolApp.component('storeGameCard', {
        templateUrl: 'src/components/store-game-card.html',
        controller: StoreGameCardController,
        controllerAs: 'storeGameCard',
        bindings: {
            card: '<',
        },
    });
}());
