import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
let WildlifeAdviceDialogComponent = class WildlifeAdviceDialogComponent {
    constructor(adviceGenericObject) {
        this.adviceGenericObject = adviceGenericObject;
        this.ourBodyText = "";
        this.ourBodyText = "<p class='card-text'>" + adviceGenericObject.BodyText + "</p>";
    }
    ngOnInit() {
    }
};
WildlifeAdviceDialogComponent = __decorate([
    Component({
        selector: 'app-wildlife-advice-dialog',
        templateUrl: './wildlife-advice-dialog.component.html',
        styleUrls: ['./wildlife-advice-dialog.component.scss']
    }),
    __param(0, Inject(MAT_DIALOG_DATA))
], WildlifeAdviceDialogComponent);
export { WildlifeAdviceDialogComponent };
//# sourceMappingURL=wildlife-advice-dialog.component.js.map