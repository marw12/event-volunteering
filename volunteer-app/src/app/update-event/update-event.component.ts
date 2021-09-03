import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/database";
import { Volunteer } from "../model/volunteer";
import { FirebaseService } from "../FirebaseService.service"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {

  updateEventForm: FormGroup;
  submitted = false;
  events = []
  maxOptionsLimit = 100
  organizers = []
  volunteers = []

  constructor(private db: AngularFireDatabase, private firebase: FirebaseService, private formBuilder: FormBuilder, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.updateEventForm = this.formBuilder.group({
      updateEventName: [""],
      event: [null, [Validators.required]],
      updateEventCategory: [""],
      updateEventDate: [""],
      updateEventStartTime: [""],
      updateEventEndTime: [""],
    });

    // get all events
    this.events = []

    this.firebase.getEvents().subscribe(
      (events) => {
        console.log(events.length + " events");
        var lim = (events.length > this.maxOptionsLimit) ? this.maxOptionsLimit : events.length
        for (var i = 0; i < lim; i++) {
          this.events.push({
            id: events[i].id,
            name: events[i].name,
            volunteers: events[i].volunteers,
          })
        }
      });
  }

  get f() {
    return this.updateEventForm.controls;
  }

  updateEventName() {
    this.submitted = true;
    if (this.updateEventForm.invalid) {
      return;
    }
    if ((<HTMLInputElement>document.getElementById("updateEventName")).value == '') {
      (<HTMLInputElement>document.getElementById("displayUpdateEventName")).innerHTML = "<span style='color: red;'> Name cannot be empty </span>";
    }

    else {
      var eventID = this.updateEventForm.controls.event.value;
      var newUpdateEventName = (<HTMLInputElement>document.getElementById("updateEventName")).value;

      this.firebase.updateEventName(eventID, newUpdateEventName);
      (<HTMLInputElement>document.getElementById("displayUpdateEventName")).innerHTML = "<span style='color: green;'> Event name changed to </span>"
        + '<div style="color: green">' + newUpdateEventName + " </div>";
      (<HTMLInputElement>document.getElementById("updateEventName")).value = '';

      setTimeout(function () {
        window.location.reload()
      }, 2000);
    }

  }
  updateEventCategory() {
    this.submitted = true;
    if (this.updateEventForm.invalid) {
      return;
    }
    if ((<HTMLInputElement>document.getElementById("updateEventCategory")).value == '') {
      (<HTMLInputElement>document.getElementById("displayUpdateEventCategory")).innerHTML = "<span style='color: red;'> Category cannot be empty </span>";
    }
    else {
      var eventID = this.updateEventForm.controls.event.value;
      var newUpdateEventCategory = (<HTMLInputElement>document.getElementById("updateEventCategory")).value;

      this.firebase.updateEventCategory(eventID, newUpdateEventCategory);
      (<HTMLInputElement>document.getElementById("displayUpdateEventCategory")).innerHTML = "<span style='color: green;'> Event category changed to </span>"
        + '<div style="color: green">' + newUpdateEventCategory + " </div>";
      (<HTMLInputElement>document.getElementById("updateEventCategory")).value = '';

      setTimeout(function () {
        window.location.reload()
      }, 2000);

    }

  }
  updateEventDate() {
    this.submitted = true;
    if (this.updateEventForm.invalid) {
      return;
    }
    if ((<HTMLInputElement>document.getElementById("updateEventDate")).value == '') {
      (<HTMLInputElement>document.getElementById("displayUpdateEventDate")).innerHTML = "<span style='color: red;'> Date cannot be empty </span>";
    }
    else {
      var eventID = this.updateEventForm.controls.event.value;
      var newUpdateEventDate = (<HTMLInputElement>document.getElementById("updateEventDate")).value;

      this.firebase.updateEventCategory(eventID, newUpdateEventDate);
      (<HTMLInputElement>document.getElementById("displayUpdateEventDate")).innerHTML = "<span style='color: green;'> Event Day changed to </span>"
        + '<div style="color: green">' + newUpdateEventDate + " </div>";
      (<HTMLInputElement>document.getElementById("updateEventDate")).value = '';

      setTimeout(function () {
        window.location.reload()
      }, 2000);

    }

  }

  updateEventStartTime() {
    this.submitted = true;
    if (this.updateEventForm.invalid) {
      return;
    }
    if ((<HTMLInputElement>document.getElementById("updateEventStartTime")).value == '') {
      (<HTMLInputElement>document.getElementById("displayUpdateEventStartTime")).innerHTML = "<span style='color: red;'> Time cannot be empty </span>";
    }
    else {
      var eventID = this.updateEventForm.controls.event.value;
      var newUpdateEventStartTime = (<HTMLInputElement>document.getElementById("updateEventStartTime")).value;

      this.firebase.updateEventStartTime(eventID, newUpdateEventStartTime);
      (<HTMLInputElement>document.getElementById("displayUpdateEventStartTime")).innerHTML = "<span style='color: green;'> Event start time changed to </span>"
        + '<div style="color: green">' + newUpdateEventStartTime + " </div>";
      (<HTMLInputElement>document.getElementById("updateEventStartTime")).value = '';

      setTimeout(function () {
        window.location.reload()
      }, 2000);

    }

  }

  updateEventEndTime() {
    this.submitted = true;
    if (this.updateEventForm.invalid) {
      return;
    }
    if ((<HTMLInputElement>document.getElementById("updateEventEndTime")).value == '') {
      (<HTMLInputElement>document.getElementById("displayUpdateEventEndTime")).innerHTML = "<span style='color: red;'> Time cannot be empty </span>";
    }
    else {
      var eventID = this.updateEventForm.controls.event.value;
      var newUpdateEventEndTime = (<HTMLInputElement>document.getElementById("updateEventEndTime")).value;

      this.firebase.updateEventEndTime(eventID, newUpdateEventEndTime);
      (<HTMLInputElement>document.getElementById("displayUpdateEventEndTime")).innerHTML = "<span style='color: green;'> Event end time changed to </span>"
        + '<div style="color: green">' + newUpdateEventEndTime + " </div>";
      (<HTMLInputElement>document.getElementById("updateEventEndTime")).value = '';

      setTimeout(function () {
        window.location.reload()
      }, 2000);

    }
  }

}
