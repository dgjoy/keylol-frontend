(function () {
    class slideShowController {
        constructor() {
            const tmp_slides = [{
                cname: '中文名中文名中文名中文名中文名中文名中文名中文名中文名中文名中文名中文名中文名中文名中文名中文名中文名中文名',
                ename: 'englishenglishenglishenglishenglishenglishenglishenglishenglishenglish',
                author: '作者',
                date: '4月7号',
                img: 'http://pic.sc.chinaz.com/files/pic/pic9/201508/apic14052.jpg',
                desc: '描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字' +
                '描述文字描述文字描述文字描述文字描述文字描述文字描述文字' +
                '描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述' +
                '文字描述文字描述文字描述文字描述文字描述文字',
            },{
                cname: '中文名',
                ename: 'english',
                author: '作者',
                date: '4月7号',
                img: 'http://pics.sc.chinaz.com/files/pic/pic9/201509/apic14816.jpg',
                desc: '描述文字',
            },{
                cname: '中文名',
                ename: 'english',
                author: '作者',
                date: '4月7号',
                img: 'http://pic.sc.chinaz.com/files/pic/pic9/201508/apic14052.jpg',
                desc: '描述文字',
            },{
                cname: '中文名',
                ename: 'english',
                author: '作者',
                date: '4月7号',
                img: 'http://pics.sc.chinaz.com/files/pic/pic9/201509/apic14816.jpg',
                desc: '描述文字',
            }];

            this.slides = tmp_slides;
            this.index = 0;
        }
        
        slideTo(index) {
            this.index = index;
        }
    }

    keylolApp.component('slideShow', {
        templateUrl: 'src/sections/slide-show.html',
        controller: slideShowController,
        controllerAs: 'slideShow',
    });
}());
