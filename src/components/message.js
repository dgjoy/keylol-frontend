(function () {
    class MessageController {
        constructor($scope, window, messageTypes, $sce) {
            $.extend(this,{
                window,
                $sce,
            });

            $scope.$watch(() => {
                return this.object;
            },() => {
                this.object.messageType = messageTypes[this.object.type];
            });
        }

        showMissive() {
            this.window.show({
                templateUrl: 'src/windows/missive.html',
                controller: 'MissiveController',
                controllerAs: 'missive',
                inputs: {
                    object: this.object,
                },
            });
        }

        // showDialogue() {
        //     this.window.show({
        //         templateUrl: 'src/windows/dialogue.html',
        //         controller: 'DialogueController',
        //         controllerAs: 'dialogue',
        //     });
        // }
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
        bindings: {
          object: '<',
        },
    });
}());
