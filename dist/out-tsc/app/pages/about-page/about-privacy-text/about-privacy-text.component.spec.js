import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { AboutPrivacyTextComponent } from './about-privacy-text.component';
describe('AboutPrivacyTextComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [AboutPrivacyTextComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AboutPrivacyTextComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=about-privacy-text.component.spec.js.map