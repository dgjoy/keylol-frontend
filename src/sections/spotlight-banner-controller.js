(function () {
    
    class SpotlightBannerController {
        constructor($scope,window,$http,notification,$location,union) {

            if ($location.url().substr(1, 11) === 'post-office') {
                this.banner = [{
                    imageSrc: 'assets/images/spotlight/post-office-l.png',
                    imageSrcActive: 'assets/images/spotlight/post-office-l-active.png',
                    link: 'post-office/acknowledgement',
                }, {
                    imageSrc: 'assets/images/spotlight/post-office-m.png',
                    imageSrcActive: 'assets/images/spotlight/post-office-m-active.png',
                    link: 'post-office/comment',
                }, {
                    imageSrc: 'assets/images/spotlight/post-office-r.png',
                    imageSrcActive: 'assets/images/spotlight/post-office-r-active.png',
                    link: 'post-office/missive',
                }];
                if (typeof union.spolightActive === 'number') {
                    this.banner[union.spolightActive].imageSrc = this.banner[union.spolightActive].imageSrcActive;
                }
            } else {
                const originBanner = [
                    {
                        imageSrc: 'assets/images/spotlight/welcome.png',
                        link: 'article/LEEEE/8',
                    }, {
                        imageSrc: 'assets/images/spotlight/touch-fish-community.png',
                        link: 'article/LEEEE/4',
                    }, {
                        imageSrc: 'assets/images/spotlight/cool-t-shirt-on-line.png',
                        link: 'article/23333/6',
                    }, {
                        imageSrc: 'assets/images/spotlight/zhihu-keylol.png',
                        link: 'article/HILOA/15',
                    },
                ];

                this.banner = [];
                for (let i = 0; i < 3; i++) {
                    this.banner = this.banner.concat(originBanner.splice(Math.floor(Math.random() * originBanner.length), 1));
                }
            }
            
        }
    }

    keylolApp.component('spotlightBanner', {
        templateUrl: 'src/sections/spotlight-banner.html',
        controller: SpotlightBannerController,
        controllerAs: 'spotlightBanner',
    });
}());
