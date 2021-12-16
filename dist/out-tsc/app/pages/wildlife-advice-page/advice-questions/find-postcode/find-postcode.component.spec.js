import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { FindPostcodeComponent } from './find-postcode.component';
describe('FindPostcodeComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [FindPostcodeComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(FindPostcodeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=find-postcode.component.spec.js.map