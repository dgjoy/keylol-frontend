(function () {
    class ChineseSupportController {
        constructor(options, object) {
            if (options.theme !== undefined)
                this.theme = options.theme;

            this.object = object;

            this.languageAvailability = ['fullAudio', 'interface', 'subtitles'];
        }
    }

    keylolApp.controller('ChineseSupportController', ChineseSupportController);
}());