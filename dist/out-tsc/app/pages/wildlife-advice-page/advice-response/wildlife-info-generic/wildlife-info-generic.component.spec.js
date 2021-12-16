import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { WildlifeInfoGenericComponent } from './wildlife-info-generic.component';
describe('WildlifeInfoGenericComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [WildlifeInfoGenericComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(WildlifeInfoGenericComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=wildlife-info-generic.component.spec.js.map