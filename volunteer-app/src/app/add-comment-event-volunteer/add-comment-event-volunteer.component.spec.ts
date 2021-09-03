import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommentEventVolunteerComponent } from './add-comment-event-volunteer.component';

describe('AddCommentEventVolunteerComponent', () => {
  let component: AddCommentEventVolunteerComponent;
  let fixture: ComponentFixture<AddCommentEventVolunteerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCommentEventVolunteerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCommentEventVolunteerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
