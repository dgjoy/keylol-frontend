(function () {
    class DatepickerSelectorController {
        constructor(content, close, $element, $timeout, $scope) {
            $.extend(this,{
                content,
                close,
            });

            if (/^\d{4}-\d{2}-\d{2}$/.test(this.content)) {
                this.selected = this.content.split('-');
                this.selected[0] = parseInt(this.selected[0]);
                this.selected[1] = parseInt(this.selected[1]) - 1;
                this.selected[2] = parseInt(this.selected[2]);
                if (this.selected[2] > DatepickerSelectorController.getDayCount({ year:this.selected[0],month:this.selected[1] })) {
                    this.selected = false;
                }
            }

            const tmp = new Date();
            this.today = [tmp.getFullYear(),tmp.getMonth(),tmp.getDate()];

            let middleDate;
            this.calenders = new Array(8);
            if (this.selected) {
                middleDate = this.selected;
            } else {
                middleDate = this.today;
            }
            this.setCalenders(middleDate[0],middleDate[1]);

            const $scroller = $element.find('.scroller');
            $timeout(() => {
                $scroller.scrollTop(264890);
            },100);

            this.bound = [264625 , 265155];
            this.nextDate = DatepickerSelectorController.dateOffset(middleDate[0],middleDate[1],5);
            this.previousDate = DatepickerSelectorController.dateOffset(middleDate[0],middleDate[1],-4);
            const scrollHandler = $scroller.on('scroll', () => {
                if ($scroller.scrollTop() < this.bound[0]) {
                    $timeout(() => {
                        this.unshiftCalenders(this.previousDate);

                        $scroller.find('.wrapper').css('transform',`translateY(${this.bound[0] - 795}px)`);
                        this.bound[0] -= 265;
                        this.bound[1] -= 265;
                        this.nextDate = DatepickerSelectorController.dateOffset(this.nextDate.year,this.nextDate.month,-1);
                        this.previousDate = DatepickerSelectorController.dateOffset(this.previousDate.year,this.previousDate.month,-1);
                    });
                } else if ($scroller.scrollTop() > this.bound[1]) {
                    $timeout(() => {
                        this.shiftCalenders(this.nextDate);

                        $scroller.find('.wrapper').css('transform',`translateY(${this.bound[1] - 795}px)`);
                        this.bound[0] += 265;
                        this.bound[1] += 265;
                        this.nextDate = DatepickerSelectorController.dateOffset(this.nextDate.year,this.nextDate.month,1);
                        this.previousDate = DatepickerSelectorController.dateOffset(this.previousDate.year,this.previousDate.month,1);
                    });
                }
            });

            $scope.$on('$destroy',() => {
                $scroller.unbind('scroll',scrollHandler);
            });
        }

        select(y,m,d) {
            const output = `${y}-${(m < 9) ? (`0${m + 1}`) : m + 1}-${(d < 10) ? (`0${d}`) : d}`;
            this.close(output);
        }

        static calCalender(date) {
            const dayCount = DatepickerSelectorController.getDayCount(date);
            const begin = new Date(date.year,date.month,1).getDay();

            const tmp = new Array(6);
            for (let i = 0;i !== tmp.length;i++) {
                tmp[i] = [];
            }

            let curDay = 1;
            for (let i = 0;i !== tmp.length;i++) {
                if (i === 0) {
                    if (begin > 2) {
                        for (let j = 0;j !== 7;j++) {
                            if (j >= begin) {
                                tmp[i].push({ span: curDay });
                                curDay += 1;
                            } else {
                                tmp[i].push({ span: 'empty' });
                            }
                        }
                    } else {
                        i += 1;
                        for (let j = 0;j !== 7;j++) {
                            tmp[0].push({ span: 'empty' });
                            if (j >= begin) {
                                tmp[i].push({ span: curDay });
                                curDay += 1;
                            } else {
                                tmp[i].push({ span: 'empty' });
                            }
                        }
                    }
                } else {
                    for (let j = 0;j !== 7;j++) {
                        if (curDay > dayCount) {
                            tmp[i].push({ span: 'empty' });
                        } else {
                            tmp[i].push({ span: curDay });
                            curDay += 1;
                        }
                    }
                }
            }
            return tmp;
        }

        static dateOffset(year,month,offset) {
            let nYear = year;
            let nMonth = month;
            if (month + offset < 0) {
                nYear -= 1;
                nMonth = 12 + (month + offset);
            } else if (month + offset > 11) {
                nYear += 1;
                nMonth = (month + offset) - 12;
            } else {
                nMonth += offset;
            }
            return {
                month:nMonth,
                year:nYear,
            };
        }

        static getDayCount(date) {
            let Feb = 28;
            if ((date.year % 400 === 0) || (date.year % 100 !== 0 && date.year % 4 === 0) ) {
                Feb = 29;
            }
            return [31,Feb,31,30,31,30,31,31,30,31,30,31][date.month];
        }

        setCalenders(year,month) {
            for (let i = 0;i !== 8;i++) {
                const date = DatepickerSelectorController.dateOffset(year,month,i - 3);
                const monthMap = ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                this.calenders[i] = {};
                this.calenders[i].weeks = DatepickerSelectorController.calCalender(date);
                this.calenders[i].ym = `${monthMap[date.month]} ${date.year}`;
                this.calenders[i].year = date.year;
                this.calenders[i].month = date.month;
            }
        }

        unshiftCalenders(date) {
            const monthMap = ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const calender = {};
            calender.weeks = DatepickerSelectorController.calCalender(date);
            calender.ym = `${monthMap[date.month]} ${date.year}`;
            calender.year = date.year;
            calender.month = date.month;

            this.calenders.unshift(calender);
            this.calenders.pop();
        }

        shiftCalenders(date) {
            const monthMap = ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const calender = {};
            calender.weeks = DatepickerSelectorController.calCalender(date);
            calender.ym = `${monthMap[date.month]} ${date.year}`;
            calender.year = date.year;
            calender.month = date.month;

            this.calenders.push(calender);
            this.calenders.shift();
        }
    }

    keylolApp.controller('DatepickerSelectorController', DatepickerSelectorController);
}());
