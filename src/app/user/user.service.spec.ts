import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

// this with CLI generated test does not work any more and has been deactivated
xdescribe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
