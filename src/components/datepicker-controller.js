(function () {
    class DatepickerController {
        constructor() {
            this.model = '2015-12-02';
            this.isFocus = false;
            this.isError = false;
        }

        focus() {
            this.isFocus = true;
        }

        blur() {
            this.isFocus = false;
        }

        check() {
            this.isError = !/^\d{4}-\d{2}-\d{2}$/.test(this.model);
        }

        showSelector($event) {
            this.showSelectorPopup({
                templateUrl: 'src/popup/datepicker-selector.html',
                controller: 'DatepickerSelectorController as datepickerSelector',
                event: $event,
                attachSide: 'bottom',
                align: 'left',
                offsetX: -24,
                offsetY: -36,
                showDelay: 0,
                closeDelay: 0,
                inputs: {
                    content: this.model,
                },
            }).then(popup => {
                return popup.close;
            }).then(result => {
                if (result !== undefined)
                    this.model = result;
            });
        }
    }

    keylolApp.component('datepicker', {
        templateUrl: 'src/components/datepicker.html',
        controller: DatepickerController,
        controllerAs: 'datepicker',
        bindings: {
            items: '<',
            state: '@',
        },
    });
}());
