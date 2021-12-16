import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { WildlifeAdviceDialogComponent } from './wildlife-advice-dialog.component';
describe('WildlifeAdviceDialogComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [WildlifeAdviceDialogComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(WildlifeAdviceDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=wildlife-advice-dialog.component.spec.js.map