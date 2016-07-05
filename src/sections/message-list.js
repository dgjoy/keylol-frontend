(function () {
    class MessageListController {
        constructor ($http, apiEndpoint, utils) {
            $.extend(this, {
                $http,
                apiEndpoint,
                utils,
            });
            this.currentPage = 1;
        }

        scrollToTop() {
            this.utils.scrollTo(0);
        }

        changePage (newPage, oldPage) {
            if (!this.changePageLock) {
                this.changePageLock = true;
                this.$http.get(`${this.apiEndpoint}${this.moduleApi}/?page=${newPage}`).then(response => {
                    this.currentPage = newPage;
                    this.isToNext = newPage > oldPage;
                    this.messages = response.data;
                    this.changePageLock = false;
                    this.scrollToTop();
                }, response => {
                    this.changePageLock = false;
                });
            }
            return true;
        }
    }

    keylolApp.component('messageList', {
        templateUrl: 'src/sections/message-list.html',
        controller: MessageListController,
        controllerAs: 'messageList',
        bindings: {
            messages: '<',
            totalPage: '<',
            moduleApi: '@',
        },
    });
}());
