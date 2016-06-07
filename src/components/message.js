(function () {
    class MessageController {
        constructor(window) {
            $.extend(this,{
                window,
            });
        }

        showMissiveCard() {
            this.window.show({
                templateUrl: 'src/windows/missive-card.html',
                controller: 'MissiveCardController',
                controllerAs: 'missiveCard',
            });
        }

        // showCallingInvitation($event) {
        //     this.showPopup({
        //         templateUrl: 'src/popup/calling-invitation.html',
        //         controller: 'CallingInvitationController as callingInvitation',
        //         event: $event,
        //         attachSide: 'bottom',
        //         align: 'center',
        //     });
        // }
        //
        // showAccepting($event) {
        //     this.showPopup({
        //         templateUrl: 'src/popup/accepting.html',
        //         controller: 'AcceptingController as accepting',
        //         event: $event,
        //         attachSide: 'bottom',
        //         align: 'center',
        //     });
        // }
    }

    keylolApp.component('message', {
        templateUrl: 'src/components/message.html',
        controller: MessageController,
        controllerAs: 'message',
    });
}());
