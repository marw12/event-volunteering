import { Time } from "@angular/common";
import { Organizer } from './organizer';
import { Task } from './task';
import { AssignedTaskVolunteer } from "./assignedTaskVolunteer";
import { Volunteer } from './volunteer';

export class Event {
  public name: string;
  public category: string
  public date: Date;
  public startTime: Time;
  public endTime: Time;
  public volunteers: Volunteer[];
  public tasks: Task[];
  public organizer: Organizer;
  public assignedTaskVolunteer: AssignedTaskVolunteer[];
  public comment: String;
}