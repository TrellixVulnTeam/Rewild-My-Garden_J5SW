import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { WildlifeMultiplechoiceComponent } from './wildlife-multiplechoice.component';
describe('WildlifeMultiplechoiceComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [WildlifeMultiplechoiceComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(WildlifeMultiplechoiceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=wildlife-multiplechoice.component.spec.js.map