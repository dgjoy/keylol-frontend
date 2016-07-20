(function () {
    class FriendInvitationController {
        constructor(close, $http, apiEndpoint, notification, stateTree) {
            $.extend(this, {
                close,
                inviteLink: `https://www.keylol.com/?aff=${stateTree.currentUser.idCode}`,
            });

            $http.get(`${apiEndpoint}states/invite-count`).then(response => {
                this.inviteCount = response.data;
            }, response => {
                notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
            });
        }
    }

    keylolApp.controller('FriendInvitationController', FriendInvitationController);
}());
