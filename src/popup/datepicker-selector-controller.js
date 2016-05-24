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
            }

            const tmp = new Date();
            this.today = [tmp.getFullYear(),tmp.getMonth(),tmp.getDate()];

            this.calenders = new Array(8);
            if (this.selected) {
                this.setCalenders(this.selected[0],this.selected[1]);
            } else {
                this.setCalenders(this.today[0],this.today[1]);
            }
            $timeout(() => {
                $element.find('.scroller').scrollTop(264890);
            },100);

            this.bound = [264625 , 264155];
            const scrollHandler = $element.on('scroll', () => {
                if ($element.scrollTop() < this.bound[0]) {
                    this.bound[0] -= 265;
                    this.bound[1] -= 265;
                } else if ($element.scrollTop() > this.bound[1]) {
                    this.bound[0] += 265;
                    this.bound[1] += 265;
                }
            });

            $scope.$on('$destroy',() => {
                $element.unbind('scroll',scrollHandler);
            });
        }

        select(y,m,d) {
            const output = `${y}-${(m < 9) ? (`0${m + 1}`) : m + 1}-${(d < 10) ? (`0${d}`) : d}`;
            this.close(output);
        }

        setCalenders(year,month) {
            function dateOffset(year,month,offset) {
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

            function calCalender(date) {
                function is_leap(year) {
                    return (year % 100 === 0 ? (year % 400 === 0 ) : (year % 4 === 0));
                }

                const dayCount = [31,is_leap(date.year) ? 28 : 29,31,30,31,30,31,31,30,31,30,31][date.month - 1];
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

            for (let i = 0;i !== 8;i++) {
                const date = dateOffset(year,month,i - 3);
                const monthMap = ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                this.calenders[i] = {};
                this.calenders[i].weeks = calCalender(date);
                this.calenders[i].ym = `${monthMap[date.month]} ${date.year}`;
                this.calenders[i].year = date.year;
                this.calenders[i].month = date.month;
            }
        }
    }

    keylolApp.controller('DatepickerSelectorController', DatepickerSelectorController);
}());
