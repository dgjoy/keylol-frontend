(function () {
    class slideShowController {
        constructor($timeout) {
            $.extend(this,{
                $timeout,
            });


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
            this.indexCount = this.slides.length;
            this.index = 0;
            this.isMoveUp = false;

            this.resetTimer();
        }
        
        slideTo(index) {
            this.isMoveUp = (index < this.index);
            this.index = index;

            this.resetTimer();
        }

        resetTimer() {
            if (this.timer !== undefined) {
                this.$timeout.cancel(this.timer);
            }
            this.timer = this.$timeout(() => {
                if (this.index < this.indexCount - 1){
                    this.slideTo(this.index + 1);
                } else {
                    this.slideTo(0);
                }
            },15000);
        }
    }

    keylolApp.component('slideShow', {
        templateUrl: 'src/sections/slide-show.html',
        controller: slideShowController,
        controllerAs: 'slideShow',
    });
}());
