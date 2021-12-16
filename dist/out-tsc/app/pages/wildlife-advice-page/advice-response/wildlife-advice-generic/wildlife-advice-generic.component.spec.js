import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { WildlifeAdviceGenericComponent } from './wildlife-advice-generic.component';
describe('WildlifeAdviceGenericComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [WildlifeAdviceGenericComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(WildlifeAdviceGenericComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=wildlife-advice-generic.component.spec.js.map