(function () {
    class ReceptionController {
        constructor ($http, notification, union, $routeParams, utils, apiEndpoint) {
            $.extend(this, {
                $http,
                notification,
                union,
                $routeParams,
                utils,
                apiEndpoint,
                quickLinks: [],
                recentLinks: [],
            });
            $.extend(this.recentLinks, union.$localStorage.recentBrowse);
            if (union.$localStorage.favorites) {
                this.setupQuickLinks(union.$localStorage.favorites);
            }

            $http.get(`${apiEndpoint}favorite`).then(response => {
                union.$localStorage.favorites = response.data;
                this.setupQuickLinks(response.data);
            }, response => {
                notification.error('发生未知错误，请重试或与站务职员联系', response);
            });
        }
        setupQuickLinks (quickLinks) {
            $.extend(this.quickLinks, quickLinks);
            this.canBeAdd = this.quickLinks.length < 5;
            for (const i in this.quickLinks) {
                if (this.quickLinks.hasOwnProperty(i)) {
                    switch (this.quickLinks[i].Type) {
                        case 'Unknown':
                            break;
                        case 'NormalPoint':
                            if (this.$routeParams.pointIdCode === this.quickLinks[i].IdCode) {
                                this.canBeAdd = false;
                            }
                            break;
                        case 'ProfilePoint':
                            if (this.$routeParams.userIdCode === this.quickLinks[i].IdCode) {
                                this.canBeAdd = false;
                            }
                            break;
                    }
                }
            }
        }
        deleteFavorite (index) {
            const deleteLink = this.quickLinks[index];
            this.notification.attention('将此据点由收藏夹移除', [
                { action: '移除', value: true },
                { action: '取消' },
            ]).then(result => {
                if (result) {
                    this.$http.delete(`${this.apiEndpoint}favorite/${deleteLink.Id}`).then(() => {
                        if (deleteLink.Type !== 'Unknown' &&
                            (this.$routeParams.pointIdCode === deleteLink.IdCode || this.$routeParams.userIdCode === deleteLink.IdCode)) {
                            this.canBeAdd = true;
                        }
                        this.quickLinks.splice(index, 1);
                    }, response => {
                        this.notification.error('发生未知错误，请重试或与站务职员联系', response);
                    });
                }
            });
        }
        addFavorite  () {
            if (this.$routeParams.pointIdCode && this.union.point.Id) {
                this.canBeAdd = false;
                this.$http.post(`${this.apiEndpoint}favorite`, {}, {
                    params: { pointId: this.union.point.Id },
                }).then(response => {
                    this.quickLinks.push({
                        Id: response.data,
                        Type: 'NormalPoint',
                        IdCode: this.union.point.IdCode,
                        Name: this.utils.getPointFirstName(this.union.point),
                    });
                    this.notification.success('当前据点已添加到收藏夹');
                }, response => {
                    this.notification.error('发生未知错误，请重试或与站务职员联系', response);
                    this.canBeAdd = true;
                });
            } else if (this.$routeParams.userIdCode && this.union.user.Id) {
                this.canBeAdd = false;
                this.$http.post(`${this.apiEndpoint}favorite`, {}, {
                    params: { pointId: this.union.user.Id },
                }).then(response => {
                    this.quickLinks.push({
                        Id: response.data,
                        Type: 'ProfilePoint',
                        IdCode: this.union.user.IdCode,
                        Name: this.union.user.UserName,
                    });
                }, response => {
                    this.notification.error('发生未知错误，请重试或与站务职员联系', response);
                    this.canBeAdd = true;
                });
            }
        }
        deleteRecentBroswe () {
            this.union.$localStorage.recentBrowse = [];
            this.recentLinks = [];
        }
    }

    keylolApp.component('reception', {
        templateUrl: 'src/sections/reception.html',
        controller: ReceptionController,
        controllerAs: 'reception',
        bindings: {
            isInPoint: '<',
        },
    });
}());
