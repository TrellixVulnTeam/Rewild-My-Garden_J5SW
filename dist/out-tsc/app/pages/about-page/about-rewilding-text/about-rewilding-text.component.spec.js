import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { AboutRewildingTextComponent } from './about-rewilding-text.component';
describe('AboutRewildingTextComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [AboutRewildingTextComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AboutRewildingTextComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=about-rewilding-text.component.spec.js.map