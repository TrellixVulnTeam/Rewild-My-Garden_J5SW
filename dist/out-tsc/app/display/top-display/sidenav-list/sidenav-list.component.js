import { __decorate } from "tslib";
import { Component, Output, EventEmitter } from '@angular/core';
let SidenavListComponent = class SidenavListComponent {
    constructor() {
        this.sidenavClose = new EventEmitter();
        this.onSidenavClose = () => {
            this.sidenavClose.emit();
        };
    }
    ngOnInit() {
    }
};
__decorate([
    Output()
], SidenavListComponent.prototype, "sidenavClose", void 0);
SidenavListComponent = __decorate([
    Component({
        selector: 'app-sidenav-list',
        templateUrl: './sidenav-list.component.html',
        styleUrls: ['./sidenav-list.component.scss']
    })
], SidenavListComponent);
export { SidenavListComponent };
//# sourceMappingURL=sidenav-list.component.js.map