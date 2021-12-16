import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { NotHomeLayoutComponent } from './not-home-layout.component';
describe('NotHomeLayoutComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [NotHomeLayoutComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(NotHomeLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=not-home-layout.component.spec.js.map