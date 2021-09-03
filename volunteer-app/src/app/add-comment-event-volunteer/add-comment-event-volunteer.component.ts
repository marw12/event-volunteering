import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase} from "@angular/fire/database";
import {FirebaseService} from "../FirebaseService.service";
import { Volunteer } from './../model/volunteer';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-comment-event-volunteer',
  templateUrl: './add-comment-event-volunteer.component.html',
  styleUrls: ['./add-comment-event-volunteer.component.css']
})
export class AddCommentEventVolunteerComponent implements OnInit {

  addCommentForm: FormGroup;
  submitted = false;
  success = false;
  message = "";
  volunteers = [];
  private vEventsObservable; 
  vEvents: any = [];
  vEventsFor = [];
  maxOptionsLimit = 100;
  userId: any;

  constructor(private firebase: FirebaseService, private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  
  ngOnInit(): void {

    this.userId = this.route.snapshot.paramMap.get('uid');

    this.addCommentForm = this.formBuilder.group({
      event: [null, [Validators.required ]],
      comment : [null, [Validators.required ]]
    });

    // get initial volunteer events
    this.vEventsObservable = this.firebase.getEvents();
    this.vEventsObservable.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        if(snapshot.volunteers != null) {
          if(snapshot.volunteers.includes(this.userId)) {
            this.vEventsFor.push(snapshot); 
          }    
        }
      });
    });
  }

  get f() {
    return this.addCommentForm.controls;
  }

  submit() {
    this.submitted = true
    if (this.addCommentForm.invalid){
      // data validation prompts are already done in html
      this.message = "Error: Unable to add comment to the event"
      return;
    } else {
      this.addcomment()
    }
    
  }

  testComment(): void {
    var eName= this.f.comment.value;
    alert(eName);
  }

  addcomment(): void {
    this.success = true;
    var comment= this.f.comment.value;
    var eventId = this.addCommentForm.controls.event.value;
    this.firebase.addCommentToEvent(eventId, comment);
    this.message = "Successfully added comment to the event!"
    
  }

}
