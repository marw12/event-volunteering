import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../FirebaseService.service';

@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.css']
})
export class AssignTaskComponent implements OnInit {

  assignForm: FormGroup;
  submitted = false;
  success = false;
  volunteers = [];
  tasks = [];
  events = [];
  maxOptionsLimit: 100;


  constructor(private db: AngularFireDatabase, private firebase: FirebaseService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.assignForm = this.formBuilder.group({
      volunteer: [null, Validators.required],
      event: [null, [Validators.required ]],
      task: [null, [Validators.required]]
    });

    this.volunteers = [];

    this.firebase.getVolunteers().subscribe(
      (volunteers) => {
     //   console.log(volunteers)
        var lim = (volunteers.length> this.maxOptionsLimit) ? this.maxOptionsLimit : volunteers.length
        for(var i=0; i<lim; i++){
          this.volunteers.push({
            id: volunteers[i].id, 
            name: volunteers[i].first_name + " " + volunteers[i].last_name,
            events: volunteers[i].events,
          })
        }
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
            volunteers: events[i].volunteers
          })
        }
    });

    console.log(this.tasks);
    
  }

  submit(): void{
    var eventID = this.assignForm.controls.event.value;
    var taskID = this.assignForm.controls.task.value;
    var volunteerID = this.assignForm.controls.volunteer.value;
    var currentVolunteers;
    this.tasks.forEach(item => {

      if(item.id.match(taskID)){
        currentVolunteers = item.volunteer;
        //if no event has no task then create new task array
        if(currentVolunteers == undefined){
          currentVolunteers =  new Array();
        }

        currentVolunteers.push(volunteerID);
      }  

    });

    this.firebase.assignVolunteerToTask(eventID, taskID, currentVolunteers);

  }

  update(): void {
    if (this.assignForm.controls.event.value != null) {
      var eventId = this.assignForm.controls.event.value;

      //find the tasks of the event selected and append the new task
      this.firebase.getTasks(eventId).subscribe(
        (tasks) => {
          var lim = (tasks.length> this.maxOptionsLimit) ? this.maxOptionsLimit : tasks.length
          for(var i=0; i<lim; i++){
            this.tasks.push({
              id: tasks[i].id, 
              name: tasks[i].name,
              volunteer: tasks[i].volunteer,
            })
          }
      });

    } else {
      this.tasks = [];
    }

  }


}
