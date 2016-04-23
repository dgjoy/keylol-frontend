(function () {
    class EntryFilterController {
        constructor (selectedIndexes, close, types, currPage, shortReviewFilter, sourceFilter) {
            $.extend(this, {
                currPage,
                close,
                subscribeUser: shortReviewFilter & 1,
                subscribePoint: shortReviewFilter & 2,
                synchronization: shortReviewFilter & 4,
                sourcePublication: sourceFilter & 1,
                sourceLike: sourceFilter & 2,
                selectedIndexes: selectedIndexes ? selectedIndexes.slice() : undefined,
                entryTypes: types,
            });
        }
        confirm () {
            this.close({
                shortReviewFilter: this.subscribeUser + this.subscribePoint + this.synchronization,
                filterOptions: this.selectedIndexes,
                sourceFilter: this.sourcePublication + this.sourceLike,
            });
        }
    }
    keylolApp.controller('EntryFilterController', EntryFilterController);
}());