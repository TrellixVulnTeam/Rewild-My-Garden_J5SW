import { __decorate } from "tslib";
import { Component, Output, EventEmitter } from '@angular/core';
let NavigationComponent = class NavigationComponent {
    constructor() {
        this.sidenavToggle = new EventEmitter();
        this.onToggleSidenav = () => {
            this.sidenavToggle.emit();
        };
    }
    ngOnInit() {
    }
};
__decorate([
    Output()
], NavigationComponent.prototype, "sidenavToggle", void 0);
NavigationComponent = __decorate([
    Component({
        selector: 'app-navigation',
        templateUrl: './navigation.component.html',
        styleUrls: ['./navigation.component.scss']
    })
], NavigationComponent);
export { NavigationComponent };
//# sourceMappingURL=navigation.component.js.map