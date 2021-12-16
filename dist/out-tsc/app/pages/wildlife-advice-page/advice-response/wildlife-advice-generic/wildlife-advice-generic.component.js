import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { WildlifeAdviceDialogComponent } from "../wildlife-advice-dialog/wildlife-advice-dialog.component";
let WildlifeAdviceGenericComponent = class WildlifeAdviceGenericComponent {
    constructor(dialog) {
        this.dialog = dialog;
        this.adviceGenericObject = {
            Header: "",
            "Hedgehogs": "",
            "Birds": "",
            "Insects": "",
            "Amphibians": "",
            Justification: "",
            BodyText: "",
            Pathname: "",
            Name: "",
            Username: "",
            Copyright: "",
            Link: "",
        };
        //Code used to output when someone wants to save a piece of advice
        this.isChecked = false;
        this.newSaveEvent = new EventEmitter();
        this.newRemoveEvent = new EventEmitter();
    }
    //this function is passed the correct month data through the HTML
    openDialog(adviceGenericObject) {
        const dialogRef = this.dialog.open(WildlifeAdviceDialogComponent, {
            height: "auto",
            width: "750px",
            data: adviceGenericObject,
        });
    }
    // make changes to the array in wildlifeLayout
    toggleSave() {
        if (!this.isChecked) {
            this.addNewSave();
            this.isChecked = true;
        }
        else {
            this.removeSave();
            this.isChecked = false;
        }
    }
    removeSave() {
        this.newRemoveEvent.emit(this.adviceGenericObject.Header);
    }
    addNewSave() {
        const saveObj = {
            Header: this.adviceGenericObject.Header,
            Pathname: this.adviceGenericObject.Pathname,
            Justification: this.adviceGenericObject.Justification,
            BodyText: this.adviceGenericObject.BodyText,
            Name: this.adviceGenericObject.Name,
            Username: this.adviceGenericObject.Username,
            Copyright: this.adviceGenericObject.Copyright,
            Link: this.adviceGenericObject.Link
        };
        this.newSaveEvent.emit(saveObj);
    }
    ngOnInit() { }
};
__decorate([
    Input()
], WildlifeAdviceGenericComponent.prototype, "adviceGenericObject", void 0);
__decorate([
    Output()
], WildlifeAdviceGenericComponent.prototype, "newSaveEvent", void 0);
__decorate([
    Output()
], WildlifeAdviceGenericComponent.prototype, "newRemoveEvent", void 0);
WildlifeAdviceGenericComponent = __decorate([
    Component({
        selector: "app-wildlife-advice-generic",
        templateUrl: "./wildlife-advice-generic.component.html",
        styleUrls: ["./wildlife-advice-generic.component.scss"],
    })
], WildlifeAdviceGenericComponent);
export { WildlifeAdviceGenericComponent };
//# sourceMappingURL=wildlife-advice-generic.component.js.map