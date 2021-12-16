import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { PollinatorDialogComponent } from './pollinator-dialog.component';
describe('PollinatorDialogComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [PollinatorDialogComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(PollinatorDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=pollinator-dialog.component.spec.js.map