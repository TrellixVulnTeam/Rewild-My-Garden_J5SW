import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
describe('DataService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DataService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=data.service.spec.js.map