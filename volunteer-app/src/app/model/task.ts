import { Time } from '@angular/common';
import { Volunteer } from './volunteer';

export class Task {
  public name: string;
  public startTime: Time;
  public endTime: Time;
  public volunteer: Volunteer[];
}