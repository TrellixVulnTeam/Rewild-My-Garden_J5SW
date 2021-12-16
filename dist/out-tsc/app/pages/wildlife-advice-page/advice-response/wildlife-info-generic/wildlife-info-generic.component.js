import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let WildlifeInfoGenericComponent = class WildlifeInfoGenericComponent {
    constructor() {
        this.infoGenericObject = { "Title": "", "Special": "", "Hedgehogs": "", "Birds": "", "Insects": "", "Amphibians": "", "BodyText": "" };
        this.ourBodyText = "";
    }
    ngOnInit() {
    }
    //change info file to take out quote marks around 'here' *********
    ngOnChanges(changes) {
        this.ourBodyText = "<b>" + changes.infoGenericObject.currentValue.Title + ":</b>" + " " + changes.infoGenericObject.currentValue.BodyText;
    }
};
__decorate([
    Input()
], WildlifeInfoGenericComponent.prototype, "infoGenericObject", void 0);
WildlifeInfoGenericComponent = __decorate([
    Component({
        selector: 'app-wildlife-info-generic',
        templateUrl: './wildlife-info-generic.component.html',
        styleUrls: ['./wildlife-info-generic.component.scss']
    })
], WildlifeInfoGenericComponent);
export { WildlifeInfoGenericComponent };
//# sourceMappingURL=wildlife-info-generic.component.js.map