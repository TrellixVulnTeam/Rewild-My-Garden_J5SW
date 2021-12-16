import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { WildlifeLayoutComponent } from './wildlife-layout.component';
describe('WildlifeLayoutComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [WildlifeLayoutComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(WildlifeLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=wildlife-layout.component.spec.js.map