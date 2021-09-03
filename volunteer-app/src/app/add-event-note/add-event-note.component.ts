import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase} from "@angular/fire/database";
import {FirebaseService} from "../FirebaseService.service";
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-add-event-note',
  templateUrl: './add-event-note.component.html',
  styleUrls: ['./add-event-note.component.css']
})
export class AddEventNoteComponent implements OnInit {

  owned_events = [];
  maxOptionsLimit = 100;
  createEventNoteForm: FormGroup;
  organizers = [];

  //id that the user is logged in with (can be seen in the url)
  uid: any;

  constructor(private db: AngularFireDatabase, private firebase: FirebaseService, private formBuilder: FormBuilder, private router: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.createEventNoteForm = this.formBuilder.group({
      eventnote: [null, [Validators.required ]],
      addeventnote: [null, [Validators.required ]]
    });

    //get all the events i am an owner of and their data into the owned_events array

    // Right now we get all events. Need a backend method to get only events that he user owns :O
    this.owned_events=[];
    this.firebase.getEvents().subscribe(
      (events) => {
        console.log(events.length + " events");
        var lim = (events.length> this.maxOptionsLimit) ? this.maxOptionsLimit : events.length
        for(var i=0; i<lim; i++){
          this.owned_events.push({
            id: events[i].id, 
            name: events[i].name,
            tasks: events[i].tasks,
            organizer: events[i].organizer
          })
        }
    });

    //get all organizers
    this.firebase.getOrganizers().subscribe(
      (organizers) => {
        console.log(organizers)
        for (var i = 0; i < organizers.length; i++) {
          this.organizers.push({
            password: organizers[i].password,
            email: organizers[i].email,
            userid: organizers[i],
            first_name: organizers[i].first_name,
            last_name: organizers[i].last_name
          })
        }
      });

      this.router.params.forEach(param =>
        this.uid = param['uid']
      );
      console.log("uid: " + this.uid);
    
  }

  addEventNote(): void{
      var eventName = this.createEventNoteForm.controls.eventnote.value;   //gets the ID of the event selected in UI
      var newEventNote = (<HTMLInputElement>document.getElementById("neweventnote")).value;   //gets the new task entered from UI

      //holds organizer's name
      var org_name;

      //get event organizer
      for(let event of this.owned_events) {
        if(event.id.match(eventName)){
          org_name = event.organizer;
          org_name = org_name.split(" ");
          break;
        }
      }

      //holds organizer's id
      var org_id;

      // get event organizer's id
      for(let org of this.organizers) {
        if(org.first_name.match(org_name[0]) && org.last_name.match(org_name[1])){
          org_id = org.userid.id;
          break;
        }
      }

      //check if organizer's id is same as login id then create note
      if(this.uid.match(org_id)){
        this.firebase.addNoteToEvent(eventName,newEventNote);
        (<HTMLInputElement>document.getElementById("addEventNoteResponse")).innerHTML = 'Event Note Successfully Created';
      }else{
        (<HTMLInputElement>document.getElementById("addEventNoteResponse")).innerHTML = 'ERROR: Only the organizer of the event can add note';
      }
  }

}
