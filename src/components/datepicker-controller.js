(function () {
    class DatepickerController {
        constructor($scope) {
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
            this.isError = true;

            function getDayCount(date) {
                let Feb = 28;
                if ((date.year % 400 === 0) || (date.year % 100 !== 0 && date.year % 4 === 0) ) {
                    Feb = 29;
                }
                return [31,Feb,31,30,31,30,31,31,30,31,30,31][date.month];
            }

            if (/^\d{4}-\d{2}-\d{2}$/.test(this.model)) {
                const selected = this.model.split('-');
                selected[0] = parseInt(selected[0]);
                selected[1] = parseInt(selected[1]) - 1;
                selected[2] = parseInt(selected[2]);
                if (selected[2] <= getDayCount({ year:selected[0],month:selected[1] })) {
                    this.isError = false;
                }
            }
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
            model: '=',
            theme: '<',
        },
    });
}());
