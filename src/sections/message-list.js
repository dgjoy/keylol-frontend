(function () {
    class MessageListController {
        constructor ($http, apiEndpoint) {
            $.extend(this, {
                $http,
                apiEndpoint,
            });
            this.currentPage = 1;
        }

        changePage (newPage, oldPage) {
            if (!this.changePageLock) {
                this.changePageLock = true;
                this.$http.get(`${this.apiEndpoint}${this.moduleApi}/?page=${newPage}`).then(response => {
                    this.currentPage = newPage;
                    this.isToNext = newPage > oldPage;
                    this.messages = response.data;
                    this.changePageLock = false;
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
