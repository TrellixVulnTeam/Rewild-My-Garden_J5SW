import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { AboutResourcesTextComponent } from './about-resources-text.component';
describe('AboutResourcesTextComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [AboutResourcesTextComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AboutResourcesTextComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=about-resources-text.component.spec.js.map