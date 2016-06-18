(function () {
    class MediaCenterController {
        constructor (window) {
            $.extend(this,{
                window,
            });
            this.list = [
                {
                    image: 'http://i0.hdslb.com/bfs/archive/9978c8c1d3235f88fd43ff047138a15e93ce4172.jpg_160x100.jpg',
                    isVideo: true,
                    text: '海民你好',
                    link: 'http://www.bilibili.com/video/av4630731/',
                },
                {
                    image: '//storage.keylol.com/c208aeee8868143d09897ca754d8ef5f.png',
                    isVideo: true,
                    text: 'OB 对黑',
                    link: 'http://dota2.178.com/201605/257640080014.html',
                },
                {
                    image: 'http://img1.gamersky.com/image2016/06/20160611_hc_44_9/gamersky_107origin_213_20166111831A18.jpg',
                },
                {
                    image: 'http://dota2.ru/wp-content/uploads/2011/10/zona-vokrug.jpg',
                },
                {
                    image: 'http://www.anuflora.com/game/wp-content/uploads/game/2015/01/doto-screen.jpg',
                },
                {
                    image: 'http://www.anuflora.com/game/wp-content/uploads/game/2015/01/doto-screen.jpg',
                },
            ];
        }

        showMediaOverlayWindow(index) {
            this.window.show({
                templateUrl: 'src/windows/media-overlay.html',
                controller: 'MediaOverlayController as mediaOverlay',
                inputs: { list: this.list, currentPage: index },
            });
        }
    }

    keylolApp.component('mediaCenter', {
        templateUrl: 'src/sections/media-center.html',
        controller: MediaCenterController,
        controllerAs: 'mediaCenter',
        bindings: {
            headerImage: '<',
            theme: '<',
        },
    });
}());
