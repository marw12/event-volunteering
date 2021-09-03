import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase} from "@angular/fire/database";
import {FirebaseService} from "../FirebaseService.service";

@Component({
  selector: 'app-event-registration',
  templateUrl: './event-registration.component.html',
  styleUrls: ['./event-registration.component.css']
})
export class EventRegistrationComponent implements OnInit {
  registerForm: FormGroup
  submitted = false
  success = false
  message = ""
  volunteers = []
  events = []
  maxOptionsLimit = 100

  // if we have extra time:
  // display event name date info etc
  // do not allow selecting events in front-end if already occured or are cancelled

  constructor(private db: AngularFireDatabase, private firebase: FirebaseService, private formBuilder: FormBuilder) {
  }

  // initialize empty form and get initial volunteer and event list
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      volunteer: [null, Validators.required],
      event: [null, [Validators.required ]]
    });

    // TODO: figure out why this results in repeated lists in the front-end dropdown menu
    // get initial volunteers
    this.volunteers = []
    this.firebase.getVolunteers().subscribe(
      (volunteers) => {
       // console.log(volunteers.length + " volunteers");
        var lim = (volunteers.length> this.maxOptionsLimit) ? this.maxOptionsLimit : volunteers.length
        for(var i=0; i<lim; i++){
          this.volunteers.push({
            id: volunteers[i].id, 
            name: volunteers[i].first_name + " " + volunteers[i].last_name,
            events: volunteers[i].events,
          })
        }
    });

    // get initial events
    this.events = []
    //temp commented out bc of overwhelmed # of events in db)
    this.firebase.getEvents().subscribe(
      (events) => {
   //     console.log(events.length + " events");
        var lim = (events.length> this.maxOptionsLimit) ? this.maxOptionsLimit : events.length
        for(var i=0; i<lim; i++){
          this.events.push({
            id: events[i].id, 
            name: events[i].name,
            volunteers: events[i].volunteers,
          })
        }
    });
  }

  // this function is called when the user clicks "Register for Event" button to submit the form
  submit() {
    this.submitted = true
 //   console.log(this.registerForm.value)
    if (this.registerForm.invalid){
      // data validation prompts are already done in html
      return;
    } else {
      this.register()
    }
    
  }
  
  // this function actually registers the the volunteer for an event
  register(): void{
    this.success = true
    var volunteerID = this.registerForm.controls.volunteer.value
    var eventID = this.registerForm.controls.event.value

    // check not null (the "null" option is due to a potential bug in e2e tests)
    if (volunteerID == null || volunteerID == undefined || volunteerID == "" || volunteerID == "null") {
      this.success = false
      this.message = "Please select a valid volunteer"
      return
    }
    if (eventID == null || eventID == undefined || eventID == "" || eventID == "null") {
      this.success = false
      this.message = "Please select a valid event"
      return
    }

    // cases: register success, already registered for this event, event is past date, event is cancelled, or other register failure

    var volEvents;
    var eventVols;

    for(var v of this.volunteers) {
      if (v.id == volunteerID) {
        volEvents = v.events
       // volEvents = {
       //   events: v.events,
      //  }
      }
    }

    for(var e of this.events) {
      if (e.id == eventID) {
        eventVols = e.volunteers
        //event = {
       //   volunteers: e.volunteers,
       // }
      }
    }

    if (volEvents == undefined) {
      volEvents = new Array();
    }

    if (eventVols == undefined) {
      eventVols = new Array();
    }

    for(e of volEvents) {
      if (e.match(eventID)) {
        this.success = false
        this.message = "You are already registered for this event!"
        return
      }
    }

    for(v of eventVols) {
      if (v.match(volunteerID)) {
        this.success = false
        this.message = "You are already registered for this event!"
        return
      }
    }

    if (this.success) {
      volEvents.push(eventID);
      eventVols.push(volunteerID);
      this.firebase.registerVolunteerEvent(volunteerID, volEvents, eventID, eventVols);
      this.message = "Successfully registered for event!"
    } else {
      this.message = "Error: Unable to register for event"
    }  
  }

  
}
