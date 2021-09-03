import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { Volunteer } from "../model/volunteer";
import {FirebaseService} from "../FirebaseService.service"
import { Observable } from "rxjs";
import { map } from "rxjs/operators";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  model = new Volunteer();
  volunteer_acc: Observable<any>;
  vol: any[];
  
  

  constructor(private db: AngularFireDatabase, private firebase: FirebaseService) { }

  ngOnInit(): void {
    //  this.getVolunteerList().subscribe(list => this.list = list);
  }

  // createVolunteerAccount(): void{

  //   var inputValue = (<HTMLInputElement>document.getElementById("emailInput")).value;


  //   if(this.checkVolunteerExists(inputValue) === false){
  //     this.firebase.createVolunteer("Marwan", "Khan", inputValue, "kabab223", "5146640021", "25/11/1968", "U3");
  //     console.log("SUCCESS ACCOUNT CREATED");
  //   }else{
  //     console.log("ERROR ACCOUNT EXISTS");
  //   }

    
  // }

  // checkIfEmailExists(email): any{

  //   return this.db.object("volunteer/" + email).valueChanges();
  // }

  // checkVolunteerExists(email): any{

  //   // var email = "foo@mail.com";
  //   var output = false;

  //   this.volunteer_acc = this.db.list('volunteer').valueChanges();
  //   this.volunteer_acc.subscribe( volunteer_acc =>{
  //     this.vol = volunteer_acc;
  //   });

  //   // console.log(this.vol); 

  //   this.vol.forEach(item => {

  //     if(item.email === email){
  //       output = true;
  //     }
      
  //   });

  //   // console.log(output);
  //   return output;

  // }


}
