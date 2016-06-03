(function () {
    class MailsController {
        constructor(window) {
            $.extend(this,{
                window,
            });
        }

        showMissiveCard(index) {
            this.window.show({
                templateUrl: 'src/windows/missive-card.html',
                controller: 'MissiveCardController',
                controllerAs: 'missiveCard',
            });
        }
    }

    keylolApp.component('mails', {
        templateUrl: 'src/sections/mails.html',
        controller: MailsController,
        controllerAs: 'mails',
    });
}());
