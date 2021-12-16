import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { ExampleGardensBodyComponent } from './example-gardens-body.component';
describe('ExampleGardensBodyComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [ExampleGardensBodyComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ExampleGardensBodyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=example-gardens-body.component.spec.js.map