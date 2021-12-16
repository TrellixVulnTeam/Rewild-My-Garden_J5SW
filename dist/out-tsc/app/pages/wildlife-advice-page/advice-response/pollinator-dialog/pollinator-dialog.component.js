import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
let PollinatorDialogComponent = class PollinatorDialogComponent {
    constructor(data) {
        this.data = data;
    }
    ngOnInit() {
    }
};
PollinatorDialogComponent = __decorate([
    Component({
        selector: 'app-pollinator-dialog',
        templateUrl: './pollinator-dialog.component.html',
        styleUrls: ['./pollinator-dialog.component.scss']
    }),
    __param(0, Inject(MAT_DIALOG_DATA))
], PollinatorDialogComponent);
export { PollinatorDialogComponent };
//# sourceMappingURL=pollinator-dialog.component.js.map