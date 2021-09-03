import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Organizer } from './model/organizer';
import { Event } from './model/event';
import { Volunteer } from './model/volunteer';

@Injectable({
  providedIn: "root",
})

export class FirebaseService {

  volunteerRef: AngularFireList<any>;
  volunteers: Observable<any[]>;
  organizerRef: AngularFireList<any>;
  organizers: Observable<any[]>;
  eventRef: AngularFireList<any>;
  events: Observable<any[]>;
  volunteerEventsRef: AngularFireList<any>;
  volunteerEvents: Observable<any>;
  user: Observable<any>;
  vols = [];

  tasks: Observable<any[]>;
  taskRef: AngularFireList<any>;
  vol;



  constructor(private db: AngularFireDatabase) { }

  //Return list of volunteers in firebase db
  getVolunteers(): Observable<any[]> {
    this.volunteerRef = this.db.list("volunteer");
    this.volunteers = this.volunteerRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ id: c.payload.key, ...c.payload.val() }))
        )
      );
    return this.volunteers;
  }

  getOrganizers(): Observable<any[]> {
    this.organizerRef = this.db.list("organizer");
    this.organizers = this.organizerRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ id: c.payload.key, ...c.payload.val() }))
        )
      );
    return this.organizers;
  }

  //Return a volunteer in firebase db using its userId
  getVolunteer(userId): Observable<any> {
    return this.db.object("volunteer/" + userId).snapshotChanges();
  }

  getUserIdByEmail(emailcheck): String {
    var id: String;
    this.getVolunteers();
    this.volunteers.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        if (snapshot.email == emailcheck)
          id = snapshot;
      });
    });
    return id;
  }

  // Update volunteer information using userId
  updateVolunteer(userId, firstName, lastName, phoneNumber, password): any {
    this.db.object("volunteer/" + userId).update({
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      password: password,
    });
  }

  //Marie's code idk which one is better
  /*  addTaskToEvent(eventId, newTask): any {
      this.db.object("event/" + eventId).update({
        tasks: newTask*/

  addTaskToEvent(eventId, newTask): any {
    this.db.list("event/" + eventId + "/tasks").push({
      name: newTask
    });
  }

  assignVolunteerToTask(eventId, taskId, volunteerId): any {

    this.db.object("event/" + eventId + "/tasks/" + taskId).update({
      volunteer: volunteerId
    });
  }


  //Add a new volunteer to the database
  createVolunteer(firstName, lastName, email, password, phoneNumber, dob): void {
    let randomId = Math.floor((Math.random() * 9000) + 1000);;
    let userId = firstName.charAt(0).toLowerCase() + lastName.charAt(0).toLowerCase() + randomId;
    this.db.object("volunteer/" + userId).update({
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      password: password,
      email: email,
      dob: dob,
    });
  }

  //Add a new volunteer to the database
  createOrganizer(firstName, lastName, email, password, phoneNumber, dob): void {
    let randomId = Math.floor((Math.random() * 9999) + 1000);;
    let userId = firstName.charAt(0).toLowerCase() + lastName.charAt(0).toLowerCase() + randomId;
    this.db.object("organizer/" + userId).update({
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      password: password,
      email: email,
      dob: dob,
    });
  }

  //Add a new event to the database
  createEvent(name, category, date, stime, etime, organizer, tasks): void {
    let randomId = Math.floor((Math.random() * 9000) + 1000);;
    let eventId = name + randomId;
    this.db.object("event/" + eventId).update({
      name: name,
      category: category,
      date: date,
      startTime: stime,
      endTime: etime,
      organizer: organizer,
      tasks: [],
      volunteers: [],
      comment: ""
    });
  }

  deleteEvent(eid): void {
    this.db.object("event/" + eid).remove();
  }

  getEvent(eid): Observable<any> {
    return this.db.object("event/" + eid).valueChanges();
  }


  getTasks(eid): Observable<any[]> {
    this.taskRef = this.db.list("event/" + eid + "/tasks");
    this.tasks = this.taskRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ id: c.payload.key, ...c.payload.val() }))
        )
      );
    return this.tasks;
  }

  //Return list of all events in firebase db
  getEvents(): Observable<any[]> {
    this.eventRef = this.db.list("event");
    this.events = this.eventRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ id: c.payload.key, ...c.payload.val() }))
        )
      );
    return this.events;
  }


  registerVolunteerEvent(volunteerID, eventList, eventID, volunteerList): boolean {
    this.db.object("event/" + eventID).update({
      volunteers: volunteerList,
    });
    return true;
  }

  unregisterVolunteerFromEvent(eventid, volunteerlist): boolean {
    this.db.object(`event/${eventid}`).update({
      volunteers: volunteerlist
    });
    return true;
  }

  // Update volunteer first name using userId
  updateVolunteerEmail(userId, email): any {
    this.db.object("volunteer/" + userId).update({
      email: email,
    });
  }

  // Update volunteer first name using userId
  updateVolunteerFirstName(userId, first_name): any {
    this.db.object("volunteer/" + userId).update({
      first_name: first_name,
    });
  }

  // Update volunteer last name using userID
  updateVolunteerLastName(userId, last_name): any {
    this.db.object("volunteer/" + userId).update({
      last_name: last_name,
    });
  }

  // Update volunteer phone number ising userID
  updateVolunteerPhoneNumber(userId, phoneNumber): any {
    this.db.object("volunteer/" + userId).update({
      phone_number: phoneNumber,
    });
  }

  // Update volunteer password ising userID
  updateVolunteerPassword(userId, password): any {
    this.db.object("volunteer/" + userId).update({
      password: password,
    });
  }

  // Update volunteer dob ising userID
  updateVolunteerDob(userId, dob): any {
    this.db.object("volunteer/" + userId).update({
      dob: dob,
    });
  }


  //Update event name
  updateEventName(eventId, name): any {
    this.db.object("event/" + eventId).update({
      name: name,
    });
  }

  //Update event category
  updateEventCategory(eventId, category): any {
    this.db.object("event/" + eventId).update({
      category: category,
    });
  }

  //Update event date
  updateEventDate(eventId, date): any {
    this.db.object("event/" + eventId).update({
      date: date,
    });
  }

  //Update event start time
  updateEventStartTime(eventId, startTime): any {
    this.db.object("event/" + eventId).update({
      startTime: startTime,
    });
  }

  //Update event end time
  updateEventEndTime(eventId, endTime): any {
    this.db.object("event/" + eventId).update({
      endTime: endTime,
    });
  }

  //Update event organizer name
  updateEventOrgName(eventId, organizer): any {
    this.db.object("event/" + eventId).update({
      organizer: organizer,
    });
  }
  
  addCommentToEvent(eventId, comment): any {
    this.db.object("event/" + eventId).update({
      comment: comment,
    });
  }

  addNoteToEvent(eventId, newNote): any{
    this.db.list("event/" + eventId + "/notes").push({
      note: newNote 
    });
  }
}
