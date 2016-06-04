/**
 * Created by Rex on 15/9/23.
 */
(function () {
    class pointHeaderController {
        constructor($scope, $window, $timeout, utils) {
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
                avatarImage:this.object.avatarImage,
                chineseName:this.object.chineseName,
                englishName:this.object.englishName,
            };

            if (this.object.type === 'game') {
                this.categories = '';
                for (let i = 0;i !== this.object.categories.length;i++) {
                    this.categories += this.object.categories[i].chineseName;
                    if (i !== this.object.categories.length - 1) {
                        this.categories += ' / ';
                    }
                }

                this.vendors = '';
                for (let i = 0;i !== this.object.vendors.length;i++) {
                    const names = utils.getPreferredPointName(this.object.vendors[i]);
                    this.vendors += names[0];
                    if (names[1]) {
                        this.vendors += ` / ${names[1]}`;
                    }
                    if (i !== this.object.vendors.length - 1) {
                        this.vendors += ' / ';
                    }
                }
            } else {
                switch (this.object.type) {
                    case 'category':
                        this.gameCount = `此类共 ${this.object.gameCount} 部作品`;
                        break;
                    case 'platform':
                        this.gameCount = `平台上共 ${this.object.gameCount} 部作品`;
                        break;
                    case 'vendor':
                        this.gameCount = `旗下共 ${this.object.gameCount} 部作品`;
                        break;
                }
            }
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
