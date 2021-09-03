import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { Volunteer } from "../model/volunteer";
import {FirebaseService} from "../FirebaseService.service"
import { Observable } from "rxjs";
import { FormGroup, FormControl, Validators, FormBuilder } 
    from '@angular/forms';

@Component({
  selector: 'app-create-volunteer',
  templateUrl: './create-volunteer.component.html',
  styleUrls: ['./create-volunteer.component.css']
})

export class CreateVolunteerComponent implements OnInit {

  model = new Volunteer();
  volunteer_acc: Observable<any>;
  vol: any[];
  
  form = new FormGroup({
    "firstName": new FormControl("", [Validators.required]),
    "lastName": new FormControl("", Validators.required),
    "emailAddress": new FormControl("", [Validators.required, Validators.email]),
    "password": new FormControl("", [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
    "phoneNumber": new FormControl("", Validators.pattern(/^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/)),
    "dob": new FormControl("")
});

  constructor(private db: AngularFireDatabase, private firebase: FirebaseService) { }

  ngOnInit(): void {

    this.volunteer_acc = this.db.list('volunteer').valueChanges();
    this.volunteer_acc.subscribe( volunteer_acc =>{
      this.vol = volunteer_acc;
    });
  }

  createVolunteerAccount(): void{

    var firstName = (<HTMLInputElement>document.getElementById("firstName")).value;
    var lastName = (<HTMLInputElement>document.getElementById("lastName")).value;
    var emailAddress = (<HTMLInputElement>document.getElementById("emailAddress")).value;
    var password = (<HTMLInputElement>document.getElementById("password")).value;
    var phoneNumber = (<HTMLInputElement>document.getElementById("phoneNumber")).value;
    var dob = (<HTMLInputElement>document.getElementById("dob")).value;
 
    if(this.checkVolunteerExists(emailAddress) === false){
      this.firebase.createVolunteer(firstName, lastName, emailAddress, password, phoneNumber, dob);
      console.log("SUCCESS ACCOUNT CREATED");
      (<HTMLInputElement>document.getElementById("display")).innerHTML = 'Acount Successfully Created';
    }else{
      console.log("ERROR ACCOUNT EXISTS");
      (<HTMLInputElement>document.getElementById("display")).innerHTML = 'Error: Email Already Exists';
    }
 
  }

  checkVolunteerExists(email): any{

    var output = false;

    this.vol.forEach(item => {

      if(item.email === email){
        output = true;
      }
      
    });

    // console.log(this.vol); 
    return output;

  }

}
