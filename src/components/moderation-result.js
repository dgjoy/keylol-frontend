(function () {
    class ModerationResultController {
        constructor (moderationResult) {
            this.text = moderationResult[this.type];
        }
    }

    keylolApp.component("moderationResult", {
        templateUrl: "src/components/moderation-result.html",
        controller: ModerationResultController,
        controllerAs: "moderationResult",
        bindings: { type: "@" },
    });
}());
