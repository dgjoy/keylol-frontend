/**
 * Created by Rex on 15/9/23.
 */
(function () {
    class pointHeaderController {
        constructor($scope, $window, utils, $state, window) {
            $.extend(this,{
                $state,
                window,
            });
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

            const $$window = $($window);
            let scrollTop = $$window.scrollTop();
            const scrollCallback = () => {
                scrollTop = $$window.scrollTop();
                if (scrollTop < 464) {
                    $scope.$apply(() => {
                        this.transform = `translateY(${scrollTop / 2}px)`;
                    });
                }
            };
            $$window.scroll(scrollCallback);

            const cancelListenRoute = $scope.$on('$destroy', () => {
                $$window.unbind('scroll', scrollCallback);
                cancelListenRoute();
            });

            if (scrollTop < 464) {
                this.transform = `translateY(${scrollTop / 2}px)`;
            } else {
                this.transform = 'translateY(132px)';
            }

            // object预处理
            this.point = {
                avatarImage: this.object.avatarImage,
                chineseName: this.object.chineseName,
                englishName: this.object.englishName,
                inLibrary: this.object.inLibrary,
            };

            if (this.object.type === 'game') {
                this.categories = this.object.categories;
                this.vendors = [];
                for (let i = 0;i !== this.object.vendors.length;i++) {
                    const names = utils.getPreferredPointName(this.object.vendors[i]);
                    this.vendors.push({ name: names[0],idCode: this.object.vendors[i].idCode });
                    if (names[1]) {
                        this.vendors.push({ name: names[1],idCode: this.object.vendors[i].idCode });
                    }
                }

                this.categoryPopup = [];
                this.vendorPopup = [];
            } else {
                switch (this.object.type) {
                    case 'category':
                        this.gameCount = `此类共 ${this.object.productCount} 部作品`;
                        break;
                    case 'platform':
                        this.gameCount = `平台上共 ${this.object.productCount} 部作品`;
                        break;
                    case 'vendor':
                        this.gameCount = `旗下共 ${this.object.productCount} 部作品`;
                        break;
                }
            }
        }

        // showCategoryPreview($event, $index) {
        //     this.categoryPopup[$index]({
        //         templateUrl: 'src/popup/point-preview-card.html',
        //         controller: 'PointPreviewCardController as pointPreviewCard',
        //         event: $event,
        //         attachSide: 'bottom',
        //         align: 'center',
        //         offsetX: 0,
        //         offsetY: 0,
        //         inputs: {
        //             idCode: this.categories[$index].idCode,
        //         },
        //     });
        // }
        //
        // showVendorPreview($event, $index) {
        //     this.vendorPopup[$index]({
        //         templateUrl: 'src/popup/point-preview-card.html',
        //         controller: 'PointPreviewCardController as pointPreviewCard',
        //         event: $event,
        //         attachSide: 'bottom',
        //         align: 'center',
        //         offsetX: 0,
        //         offsetY: 0,
        //         // inputs: {
        //         //     idCode: this.vendors[$index].idCode,
        //         // },
        //     });
        // }

        showMenu($event) {
            this.showMenuPopup({
                templateUrl: 'src/popup/point-header-menu.html',
                controller: 'PointHeaderMenuController as pointHeaderMenu',
                event: $event,
                attachSide: 'bottom',
                align: 'right',
                offsetX: 0,
                offsetY: -24,
                inputs: {
                    actions: [() => {
                        this.$state.go('aggregation.point.edit.info');
                    },() => {
                        this.window.show({
                            templateUrl: 'src/windows/point-pusher.html',
                            controller: 'PointPusherController as pointPusher',
                            inputs: {
                                pointIdCode: this.object.idCode,
                            },
                        });
                    }],
                },
            });
        }
    }

    keylolApp.component('pointHeader', {
        templateUrl: 'src/sections/point-header.html',
        controller: pointHeaderController,
        controllerAs: 'pointHeader',
        bindings: {
            theme: '<',
            object: '<',
        },
    });
}());
