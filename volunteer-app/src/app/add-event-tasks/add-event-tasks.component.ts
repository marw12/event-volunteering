import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase} from "@angular/fire/database";
import {FirebaseService} from "../FirebaseService.service";

@Component({
  selector: 'app-add-event-tasks',
  templateUrl: './add-event-tasks.component.html',
  styleUrls: ['./add-event-tasks.component.css']
})
export class AddEventTasksComponent implements OnInit {

  all_events = [];  //contains all the events and their data
  maxOptionsLimit = 100;
  registerForm: FormGroup;

  constructor(private db: AngularFireDatabase, private firebase: FirebaseService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      eventtask: [null, [Validators.required ]],
      addtask: [null, [Validators.required ]]
    });

    //get all the events and their data into the all_events array

    this.all_events=[];
    this.firebase.getEvents().subscribe(
      (events) => {
        console.log(events);
        console.log(events.length + " events");
        var lim = (events.length> this.maxOptionsLimit) ? this.maxOptionsLimit : events.length
        for(var i=0; i<lim; i++){
          this.all_events.push({
            id: events[i].id, 
            name: events[i].name,
            tasks: events[i].tasks,
          })
        }
    });

    
  }


  addTask(): void{

    var eventId = this.registerForm.controls.eventtask.value;   //gets the ID of the event selected in UI
    var newTask = (<HTMLInputElement>document.getElementById("newTask")).value;   //gets the new task entered from UI

    //will hold the current task and then later appended with the new task
    var currentTasks;


    //find the tasks of the event selected and append the new task
    /*this.all_events.forEach(item => {

        if(item.id.match(eventId)){
          currentTasks = item.tasks;

          //if no event has no task then create new task array
          if(currentTasks == undefined){
            currentTasks =  new Array();
          }

          currentTasks.push(newTask);
        }  

      });*/
    
    // api call adds the updated task list into the database
    this.firebase.addTaskToEvent(eventId, newTask);

  }


  getEventTasks(){

    var eventId = this.registerForm.controls.eventtask.value

    var currentTasks;

    //find the tasks of the event selected and append the new task
    this.all_events.forEach(item => {

      if(item.id.match(eventId)){
        currentTasks = item.tasks;

      }  

    });

    console.log(currentTasks);

    return currentTasks;

  }



}
