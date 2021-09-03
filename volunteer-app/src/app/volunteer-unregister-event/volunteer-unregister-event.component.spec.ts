import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerUnregisterEventComponent } from './volunteer-unregister-event.component';

describe('VolunteerUnregisterEventComponent', () => {
  let component: VolunteerUnregisterEventComponent;
  let fixture: ComponentFixture<VolunteerUnregisterEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunteerUnregisterEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerUnregisterEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
