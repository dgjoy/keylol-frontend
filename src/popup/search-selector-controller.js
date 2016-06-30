(function () {
    class SearchSelectorController {
        constructor($scope, union, $location, options, $http, apiEndpoint, notification, utils, window) {
            $.extend(this, {
                $location,
                options,
                $http,
                apiEndpoint,
                notification,
                utils,
                window,
            });

            if (!union.searchFilter) {
                union.searchFilter = [
                    {
                        type: 'point',
                        name: '据点',
                        active: true,
                    },
                    {
                        type: 'article',
                        name: '文章',
                    },
                    {
                        type: 'user',
                        name: '用户',
                    },
                ];
            }

            this.onSearching = options.onSearching;
            this.union = union;
            this.filterArray = union.searchFilter;
            for (let i = 0;i < this.filterArray.length;i++) {
                if (this.filterArray[i].active === true) {
                    this.filterText = this.filterArray[i].text;
                }
            }
            $scope.$watch(() => {
                return options.searchText;
            }, () => {
                this.getSearchResult(this.filterText);
            });
        }

        getSearchResult (filterTxt) {
            if (this.options.searchText) {
                switch (filterTxt) {
                    case '据点':
                        // this.$http.get(`${this.apiEndpoint}normal-point/keyword/${encodeURIComponent(this.options.searchText)}`)
                        //     .then(response => {
                        //         if (response.data.length > 0) {
                        //             this.resultArray = [];
                        //             for (let i = 0;i < response.data.length;i++) {
                        //                 const point = response.data[i];
                        //                 const result = {
                        //                     avatar: point.AvatarImage,
                        //                     type: utils.getPointType(point.Type),
                        //                     url: `point/${point.IdCode}`,
                        //                 };
                        //                 result.mainTitle = this.utils.getPointFirstName(point);
                        //                 result.subTitle = this.utils.getPointSecondName(point);
                        //                 this.resultArray.push(result);
                        //             }
                        //         } else {
                        //             this.resultArray = undefined;
                        //             this.notFound = true;
                        //         }
                        //     }, response => {
                        //         this.notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
                        //     });
                        break;
                    case '文章':
                        // this.$http.get(`${this.apiEndpoint}article/keyword/${encodeURIComponent(this.options.searchText)}`)
                        //     .then(response => {
                        //         if (response.data.length > 0) {
                        //             this.resultArray = [];
                        //             for (let i = 0;i < response.data.length;i++) {
                        //                 const article = response.data[i];
                        //                 this.resultArray.push({
                        //                     mainTitle: article.Title,
                        //                     articleInfo: {
                        //                         acknowledgeNum: article.LikeCount,
                        //                         commentNum: article.CommentCount,
                        //                     },
                        //                     url: `article/${article.AuthorIdCode}/${article.SequenceNumberForAuthor}`,
                        //                 });
                        //             }
                        //         } else {
                        //             this.resultArray = undefined;
                        //             this.notFound = true;
                        //         }
                        //     }, response => {
                        //         this.notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
                        //     });
                        break;
                    case '用户':
                        // this.$http.get(`${this.apiEndpoint}user/${encodeURIComponent(this.options.searchText)}`, {
                        //     params: { idType: 'UserName' },
                        // }).then(response => {
                        //     if (response.data) {
                        //         this.resultArray = [];
                        //         const user = response.data;
                        //         this.resultArray.push({
                        //             mainTitle: user.UserName,
                        //             subTitle: user.GamerTag,
                        //             avatar: user.AvatarImage,
                        //             type: '个人',
                        //             url: `user/'${user.IdCode}`,
                        //             isUser: true,
                        //         });
                        //     }
                        // }, error => {
                        //     if (error.status === 404) {
                        //         this.resultArray = undefined;
                        //         this.notFound = true;
                        //     } else {
                        //         this.notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
                        //     }
                        // });
                        break;
                    default :
                        this.resultArray = undefined;
                        this.notFound = true;
                }
            }
        }

        changeFilter ($index) {
            if (!this.filterArray[$index].active) {
                for (let i = 0;i < this.filterArray.length;i++) {
                    this.filterArray[i].active = false;
                }
                this.filterArray[$index].active = true;
                this.filterText = this.filterArray[$index].text;
                this.getSearchResult(this.filterText);
            }
        }

        jumpTo (url) {
            this.$location.url(url);
        }
    }

    keylolApp.controller('SearchSelectorController', SearchSelectorController);
}());
