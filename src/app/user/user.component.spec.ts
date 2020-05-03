import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { UserComponent } from './user.component';
import { UserService } from './user.service';
import { DataService } from '../shared/data.service';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use the username of service', () => {
    const userService = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
    expect(component.user.name).toEqual(userService.user.name);
  });

  it('should display username if user is logged in', () => {
    component.isLoggedIn = true;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain(
      component.user.name
    );
  });

  it('shouldn"t display username if user is logged out', () => {
    component.isLoggedIn = false;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).not.toContain(
      component.user.name
    );
  });

  it('SpyOn1: shouldn"t fetch data if not called asyncronously', () => {
    const dataService = fixture.debugElement.injector.get(DataService);
    const spy = spyOn(dataService, 'getDetails').and.returnValue(
      Promise.resolve('Test Data')
    );
    fixture.detectChanges();
    expect(component.data).toBeUndefined();
  });

  it('SpyOn2: should fetch data successfully if called asyncronously with async', async(() => {
    const fixtureAsync = TestBed.createComponent(UserComponent);
    const componentAsync = fixtureAsync.debugElement.componentInstance;
    const dataService = fixtureAsync.debugElement.injector.get(DataService);
    const spy = spyOn(dataService, 'getDetails').and.returnValue(
      Promise.resolve('Test Data')
    );
    fixtureAsync.detectChanges();
    fixtureAsync.whenStable().then(() => {
      expect(componentAsync.data).toBe('Test Data');
    });
  }));

  it('SpyOn3: should fetch data successfully if called asyncronously with fakeAsync', fakeAsync(() => {
    const fixtureAsync = TestBed.createComponent(UserComponent);
    const componentAsync = fixtureAsync.debugElement.componentInstance;
    const dataService = fixtureAsync.debugElement.injector.get(DataService);
    const spy = spyOn<DataService, 'getDetails'>(
      dataService,
      'getDetails'
    ).and.returnValue(Promise.resolve('Test Data'));
    fixtureAsync.detectChanges();
    tick();
    expect(componentAsync.data).toBe('Test Data', 'fakeAsync with spyOn');
  }));

  it('should fetch real data successfully if called asyncronously', async () => {
    const dataservice = fixture.debugElement.injector.get(DataService);
    await dataservice.getDetails().then((result: string) => {
      expect(component.data).toBe(result);
    });
  });
});
