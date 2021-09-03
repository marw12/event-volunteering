import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventTasksComponent } from './add-event-tasks.component';

describe('AddEventTasksComponent', () => {
  let component: AddEventTasksComponent;
  let fixture: ComponentFixture<AddEventTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEventTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
