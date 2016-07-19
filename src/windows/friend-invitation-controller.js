(function () {
    class FriendInvitationController {
        constructor(close) {
            $.extend(this, {
                close,
            });
        }
    }

    keylolApp.controller('FriendInvitationController', FriendInvitationController);
}());
