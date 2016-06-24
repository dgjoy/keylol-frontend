(function () {
    class StoreGameCardController {
        constructor(utils, stores) {
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

            this.stores = [];
            if (this.card.steamAppId) {
                const steamItem = {
                    icon: 'dtb-steam',
                    discount: this.card.steamDiscountPrice ? `${parseInt(this.card.steamDiscountPrice / this.card.steamPrice * 100)}%` : undefined,
                    link: `http://store.steampowered.com/app/${this.card.steamAppId}`,
                };
                if (this.card.steamPrice) {
                    steamItem.price = `¥ ${this.card.steamPrice}`;
                } else if (this.card.steamPrice === 0) {
                    steamItem.price = '免费';
                }
                this.stores.push(steamItem);
            }

            for (let i = 1;i !== stores.length; i++) {
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
