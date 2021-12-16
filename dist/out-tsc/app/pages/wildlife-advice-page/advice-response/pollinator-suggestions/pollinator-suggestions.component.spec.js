import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { PollinatorSuggestionsComponent } from './pollinator-suggestions.component';
describe('PollinatorSuggestionsComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [PollinatorSuggestionsComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(PollinatorSuggestionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=pollinator-suggestions.component.spec.js.map