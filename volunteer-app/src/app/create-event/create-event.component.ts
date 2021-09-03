import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase} from "@angular/fire/database";
import {FirebaseService} from "../FirebaseService.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  
  registerForm: FormGroup;
  submitted = false;
  createdEvent = false;
  //for the video
  constructor(private db: AngularFireDatabase, private firebase: FirebaseService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      category: [''],
      date: ['', [Validators.required ]],
      startTime: ['', [Validators.required], ],
      endTime: ['', [Validators.required ]],
      organizer: [''],
    });
  }

  get f() {
    return this.registerForm.controls;
  }
 
  onSubmit() {
    this.submitted = true;
 
    if (this.registerForm.invalid) {
      this.createdEvent = false;
      return;
    }

    else {
      console.log('name=' + this.f.name.value);
      console.log('category=' + this.f.category.value);
      console.log('date=' + this.f.date.value);
      console.log('startTime=' + this.f.startTime.value);
      console.log('endTime=' + this.f.endTime.value);
      console.log('organizer=' + this.f.organizer.value);
      this.createEvent()
    }
    
  }

  createEvent(): void{
    var eName= this.f.name.value;
    var eCategory= this.f.category.value;
    var eStartTime= this.f.startTime.value;
    var eEndTime= this.f.endTime.value;
    var eDate= this.f.date.value;
    var eOrganizer= this.f.organizer.value;
    var etasks = [];
    
    this.createdEvent = true;

    this.firebase.createEvent(eName, eCategory, eDate, eStartTime, eEndTime, eOrganizer, []);
    
  }

}
