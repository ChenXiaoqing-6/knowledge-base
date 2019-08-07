import { KbService } from './kb.service';
import { CloudServiceMock } from './mock/cloud.service.mock';


describe('KbService', () => {
    let kbService: KbService;
    const cloudService = new CloudServiceMock();
    beforeEach(() => {
        kbService = new KbService(<any> cloudService);
    });

    it('should be created', () => {
        expect(kbService).toBeTruthy();
    });
});
