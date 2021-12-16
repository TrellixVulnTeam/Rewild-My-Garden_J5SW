import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { DisplayUserResponseComponent } from './display-user-response.component';
describe('DisplayUserResponseComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [DisplayUserResponseComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(DisplayUserResponseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=display-user-response.component.spec.js.map