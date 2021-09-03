import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../FirebaseService.service';

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.css']
})
export class DeleteEventComponent implements OnInit {

  assignForm: FormGroup;
  events = [];
  organizers = [];
  submitted = false;
  success = false;
  maxOptionsLimit: 100;
  message = "Success!";

  constructor(private db: AngularFireDatabase, private firebase: FirebaseService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.assignForm = this.formBuilder.group({
      organizer: [null, Validators.required],
      event: [null, [Validators.required ]]
    });

    this.events = [];

    this.firebase.getEvents().subscribe(
      (events) => {
        var lim = (events.length> this.maxOptionsLimit) ? this.maxOptionsLimit : events.length
        for(var i=0; i<lim; i++){
          this.events.push({
            id: events[i].id, 
            name: events[i].name,
            tasks: events[i].tasks,
            organizer: events[i].organizer,
          })
        }
    });

    this.organizers = [];

    this.firebase.getOrganizers().subscribe(
      (organizers) => {
     //   console.log(volunteers)
        var lim = (organizers.length> this.maxOptionsLimit) ? this.maxOptionsLimit : organizers.length
        for(var i=0; i<lim; i++){
          this.organizers.push({
            id: organizers[i].id, 
            name: organizers[i].first_name + " " + organizers[i].last_name,
          })
        }
    });

  }

  submit(): void {
    var eventID = this.assignForm.controls.event.value;
    var organizerID = this.assignForm.controls.organizer.value;
    var organizerMatchesEvent = false;
    this.submitted = true;

    for (var event of this.events) {
      if (event.id == eventID) {
        if (event.organizer == organizerID) {
          organizerMatchesEvent = true;
        }
      }
    }


    if (organizerMatchesEvent) {
      this.firebase.deleteEvent(eventID);
      this.success = true;
    } else {
      this.success = false;
      this.message = "Organizer did not organize selected event";
    }

  }

}
