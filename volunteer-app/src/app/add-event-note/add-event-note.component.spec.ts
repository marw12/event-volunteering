import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventNoteComponent } from './add-event-note.component';

describe('AddEventNoteComponent', () => {
  let component: AddEventNoteComponent;
  let fixture: ComponentFixture<AddEventNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEventNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
