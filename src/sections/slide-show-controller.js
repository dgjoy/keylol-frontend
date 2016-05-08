(function () {
    class SlideShowController {
        constructor($timeout) {
            $.extend(this,{
                $timeout,
            });


            const tmp_slides = [{
                title: 'Rogue Stormer（恶棍风暴兵团） Boss攻略与成就指南',
                cname: '恶棍风暴兵团',
                ename: 'Rogue Stormers',
                author: '@Xxxxxxx',
                date: '5月6号',
                img: '//storage.keylol.com/37ba4e25767b3b4c1417f4c625e88492.jpg',
                desc: '《恶棍风暴兵团》 是一款现代版Contra／/Metal Slug 游戏，它结合了 这种roguelike 类型的混搭游戏，并包括和 RPG 角色扮演的元素，游戏中有着、加上疯狂的3D 图形与可支持一至四人的多人游戏合作模式。',
            },{
                title: 'Rogue Stormer（恶棍风暴兵团） Boss攻略与成就指南',
                cname: '恶棍风暴兵团',
                ename: 'Rogue Stormers',
                author: '@Xxxxxxx',
                date: '5月6号',
                img: '//storage.keylol.com/39b7d020df471d6c0e3fa593802000bc.jpg!timeline.thumbnail.new',
                desc: '《恶棍风暴兵团》 是一款现代版Contra／/Metal Slug 游戏，它结合了 这种roguelike 类型的混搭游戏，并包括和 RPG 角色扮演的元素，游戏中有着、加上疯狂的3D 图形与可支持一至四人的多人游戏合作模式。',
            },{
                title: 'Rogue Stormer（恶棍风暴兵团） Boss攻略与成就指南',
                cname: '恶棍风暴兵团',
                ename: 'Rogue Stormers',
                author: '@Xxxxxxx',
                date: '5月6号',
                img: '',
                desc: '《恶棍风暴兵团》 是一款现代版Contra／/Metal Slug 游戏，它结合了 这种roguelike 类型的混搭游戏，并包括和 RPG 角色扮演的元素，游戏中有着、加上疯狂的3D 图形与可支持一至四人的多人游戏合作模式。',
            },{
                title: 'Rogue Stormer（恶棍风暴兵团） Boss攻略与成就指南',
                cname: '恶棍风暴兵团',
                ename: 'Rogue Stormers',
                author: '@Xxxxxxx',
                date: '5月6号',
                img: '//storage.keylol.com/39b7d020df471d6c0e3fa593802000bc.jpg!timeline.thumbnail.new',
                desc: '《恶棍风暴兵团》 是一款现代版Contra／/Metal Slug 游戏，它结合了 这种roguelike 类型的混搭游戏，并包括和 RPG 角色扮演的元素，游戏中有着、加上疯狂的3D 图形与可支持一至四人的多人游戏合作模式。',
            }];

            this.slides = tmp_slides;
            this.indexCount = this.slides.length;
            this.index = 0;
            this.oldIndex = -1;
            this.isMoveUp = false;

            this.resetTimer();
        }
        
        slideTo(index) {
            if (index === this.index)
                return ;

            this.isMoveUp = (index < this.index);
            this.oldIndex = this.index;
            this.index = index;

            this.resetTimer();
        }

        resetTimer() {
            if (this.timer !== undefined) {
                this.$timeout.cancel(this.timer);
            }
            this.timer = this.$timeout(() => {
                if (this.index < this.indexCount - 1) {
                    this.slideTo(this.index + 1);
                } else {
                    this.slideTo(0);
                }
            },15000);
        }
    }

    keylolApp.component('slideShow', {
        templateUrl: 'src/sections/slide-show.html',
        controller: SlideShowController,
        controllerAs: 'slideShow',
    });
}());
