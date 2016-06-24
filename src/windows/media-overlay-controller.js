(function () {
    class MediaOverlayController {
        constructor(list, currentPage, point, $element, $timeout, $window, $scope, close, $filter) {
            $.extend(this,{
                list,
                currentPage,
                point,
                $window,
                $scope,
                close,
                $filter,
            });
            this.result = [];
            this.closeLock = false;

            $timeout(() => {
                this._con = [$element.find('.header'), $element.find('switch-pagination button'), $element.find('.picture img')];
                const clickHandler = $($window).bind('click',$event => {
                    if (this.closeLock) {
                        return;
                    }

                    let inner = false;
                    for (let i = 0;i !== this._con.length; i++) {
                        const _con = this._con[i];
                        if (_con.is($event.target) || _con.has($event.target).length !== 0) {
                            inner = true;
                            break;
                        }
                    }

                    if (!inner) {
                        $($window).unbind('click',clickHandler);
                        close(this.result);
                    }
                });
            });
        }
        
        getType(str) {
            switch (str) {
                case 'artwork':
                    return '原画';
                case 'screenshot':
                    return '截图';
            }
        }

        nextPage() {
            this.currentPage += 1;
        }

        previousPage() {
            this.currentPage -= 1;
        }

        showMenu($event) {
            if ($.inArray(this.currentPage - 1,this.result) !== -1) {
                return ;
            }
            this.closeLock = true;
            this.showMenuPopup({
                templateUrl: 'src/popup/media-menu.html',
                controller: 'MediaMenuController as mediaMenu',
                event: $event,
                attachSide: 'right',
                align: 'top',
                offsetX: -220,
                offsetY: 0,
                inputs: {
                    actions:[() => {
                        this.list[this.currentPage - 1].link = '';
                        this.result.push(this.currentPage - 1);
                    }, () => {
                        if (this.list[this.currentPage - 1].link !== '') {
                            window.open(`${this.$filter('uriRelocate')(this.list[this.currentPage - 1].link)}`);
                        }
                    }],
                },
            }).then(popup => {
                return popup.close;
            }).then(result => {
                this.closeLock = false;
            });
        }
    }
    keylolApp.controller('MediaOverlayController', MediaOverlayController);
}());
