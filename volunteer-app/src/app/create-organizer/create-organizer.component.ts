import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { Organizer } from "../model/organizer";
import {FirebaseService} from "../FirebaseService.service"
import { Observable } from "rxjs";
import { FormGroup, FormControl, Validators, FormBuilder } 
    from '@angular/forms';


@Component({
  selector: 'app-create-organizer',
  templateUrl: './create-organizer.component.html',
  styleUrls: ['./create-organizer.component.css']
})
export class CreateOrganizerComponent implements OnInit {
  model = new Organizer();
  organizer_acc: Observable<any>;
  org: any[];
  
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
    this.organizer_acc = this.db.list('organizer').valueChanges();
    this.organizer_acc.subscribe( organizer_acc =>{
      this.org = organizer_acc;
    });
  }
  createOrganizerAccount(): void{
  var firstName = (<HTMLInputElement>document.getElementById("firstName")).value;
  var lastName = (<HTMLInputElement>document.getElementById("lastName")).value;
  var emailAddress = (<HTMLInputElement>document.getElementById("emailAddress")).value;
  var password = (<HTMLInputElement>document.getElementById("password")).value;
  var phoneNumber = (<HTMLInputElement>document.getElementById("phoneNumber")).value;
  var dob = (<HTMLInputElement>document.getElementById("dob")).value;

  if(this.checkOrganizerExists(emailAddress) === false){
    this.firebase.createOrganizer(firstName, lastName, emailAddress, password, phoneNumber, dob);
    console.log("SUCCESS ACCOUNT CREATED");
    (<HTMLInputElement>document.getElementById("display")).innerHTML = 'Account Successfully Created';
    // alert('Success');
  }else{
    console.log("ERROR ACCOUNT EXISTS");
    (<HTMLInputElement>document.getElementById("display")).innerHTML = 'Error: Email Already Exists';
    // alert('Failed');
    }
  }

  checkOrganizerExists(email): any{

    var output = false;

    this.org.forEach(item => {

      if(item.email === email){
        output = true;
      }
      
    });

    // console.log(this.vol); 
    return output;

  }

}
