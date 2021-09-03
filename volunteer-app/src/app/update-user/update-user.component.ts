import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/database";
import { Volunteer } from "../model/volunteer";
import { FirebaseService } from "../FirebaseService.service"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  updateUserForm: FormGroup;
  submitted = false;
  userId: any;
  constructor(private db: AngularFireDatabase, private firebase: FirebaseService, private formBuilder: FormBuilder, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.updateUserForm = this.formBuilder.group({
      updateFirstName: [""],
      updateLastName: [""],
      updateEmail: ["", [Validators.email]],
      updatePassword: [""],
      updatePhoneNbr: ["", Validators.pattern(/^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/)],
      updateDob: [""]
    });
  }

  get f() {
    return this.updateUserForm.controls;
  }

  //change email
  updateUserEmail() {
    this.submitted = true;
    if (this.updateUserForm.invalid) {
      return;
    }
    if ((<HTMLInputElement>document.getElementById("updateEmail")).value == '') {
      (<HTMLInputElement>document.getElementById("displayUpdateEmail")).innerHTML = "<span style='color: red;'> Email cannot be empty </span>";
    }
    else {
      this.userId = this.route.snapshot.paramMap.get('uid');
      var newEmail = (<HTMLInputElement>document.getElementById("updateEmail")).value;

      this.firebase.updateVolunteerEmail(this.userId, newEmail);
      (<HTMLInputElement>document.getElementById("displayUpdateEmail")).innerHTML = "<span style='color: green;'> Email address changed to </span>" + '<div style="color: green">' + newEmail + " </div>";
      (<HTMLInputElement>document.getElementById("updateEmail")).value = '';
    }
  }

  //change password
  updatePassword() {
    this.submitted = true;
    if (this.updateUserForm.invalid) {
      return;
    }
    if ((<HTMLInputElement>document.getElementById("updatePassword1")).value == '' && (<HTMLInputElement>document.getElementById("updatePassword2")).value == '') {
      (<HTMLInputElement>document.getElementById("displayUpdatePassword")).innerHTML = "<span style='color: red;'> Password cannot be empty </span>";
    }
    else if ((<HTMLInputElement>document.getElementById("updatePassword1")).value != (<HTMLInputElement>document.getElementById("updatePassword2")).value) {
      (<HTMLInputElement>document.getElementById("displayUpdatePassword")).innerHTML = "<span style='color: red;'> Password do not match please try again </span>";
      (<HTMLInputElement>document.getElementById("updatePassword1")).value = '';
      (<HTMLInputElement>document.getElementById("updatePassword2")).value = '';
    }
    else {
      this.userId = this.route.snapshot.paramMap.get('uid');
      var newPassword = (<HTMLInputElement>document.getElementById("updatePassword1")).value;

      this.firebase.updateVolunteerPassword(this.userId, newPassword);
      (<HTMLInputElement>document.getElementById("displayUpdatePassword")).innerHTML = "<span style='color: green;'> Password changed successfully";
      (<HTMLInputElement>document.getElementById("updatePassword1")).value = '';
      (<HTMLInputElement>document.getElementById("updatePassword2")).value = '';
    }
  }

  //change first name
  updateFirstName() {
    this.submitted = true;
    if (this.updateUserForm.invalid) {
      return;
    }
    if ((<HTMLInputElement>document.getElementById("updateFirstName")).value == '') {
      (<HTMLInputElement>document.getElementById("displayUpdateFirstName")).innerHTML = "<span style='color: red;'> First name cannot be empty</span>";
    }
    else {
      this.userId = this.route.snapshot.paramMap.get('uid');
      var newFirstName = (<HTMLInputElement>document.getElementById("updateFirstName")).value;

      this.firebase.updateVolunteerFirstName(this.userId, newFirstName);
      (<HTMLInputElement>document.getElementById("displayUpdateFirstName")).innerHTML = "<span style='color: green;'> First name changed to </span>" + '<div style="color: green">' + newFirstName + " </div>";
      (<HTMLInputElement>document.getElementById("updateFirstName")).value = '';
    }
  }

  //change last name
  updateLastName() {
    this.submitted = true;
    if (this.updateUserForm.invalid) {
      return;
    }
    if ((<HTMLInputElement>document.getElementById("updateLastName")).value == '') {
      (<HTMLInputElement>document.getElementById("displayUpdateLastName")).innerHTML = "<span style='color: red;'> Last name cannot be empty </span>";
    }
    else {
      this.userId = this.route.snapshot.paramMap.get('uid');
      var newLastName = (<HTMLInputElement>document.getElementById("updateLastName")).value;

      this.firebase.updateVolunteerLastName(this.userId, newLastName);
      (<HTMLInputElement>document.getElementById("displayUpdateLastName")).innerHTML = "<span style='color: green;'> First name changed to </span>" + '<div style="color: green">' + newLastName + " </div>";
      (<HTMLInputElement>document.getElementById("updateLastName")).value = '';
    }
  }

  //change phone number
  updatePhoneNbr() {
    this.submitted = true;
    if (this.updateUserForm.invalid) {
      return;
    }
    if ((<HTMLInputElement>document.getElementById("updatePhoneNbr")).value == '') {
      (<HTMLInputElement>document.getElementById("displayupdatePhoneNbr")).innerHTML = "<span style='color: red;'> Phone number cannot be empty </span>";
    }
    else {
      this.userId = this.route.snapshot.paramMap.get('uid');
      var newPhoneNbr = (<HTMLInputElement>document.getElementById("updatePhoneNbr")).value;

      this.firebase.updateVolunteerLastName(this.userId, newPhoneNbr);
      (<HTMLInputElement>document.getElementById("displayupdatePhoneNbr")).innerHTML = "<span style='color: green;'> Phone number changed to </span>" + '<div style="color: green">' + newPhoneNbr + " </div>";
      (<HTMLInputElement>document.getElementById("updatePhoneNbr")).value = '';
    }
  }

  updateDob() {
    this.submitted = true;
    //date selected greater than current year
    var current = new Date();
    var currentYear = current.getFullYear();
    var updateDobVal = (<HTMLInputElement>document.getElementById("updateDob")).value;
    var dob = new Date(updateDobVal);
    var year = dob.getFullYear();

    if (this.updateUserForm.invalid) {
      return;
    }
    if ((<HTMLInputElement>document.getElementById("updateDob")).value == '') {
      (<HTMLInputElement>document.getElementById("displayUpdateDob")).innerHTML = "<span style='color: red;'> Date of birth cannot be empty </span>";
    }
    else if (year >= currentYear) {
      (<HTMLInputElement>document.getElementById("displayUpdateDob")).innerHTML = "<span style='color: red;'> Date of birth invalid must be before </span>" + '<div style="color: red">' + currentYear + " </div>";
    }

    else {
      this.userId = this.route.snapshot.paramMap.get('uid');
      var newDob = (<HTMLInputElement>document.getElementById("updateDob")).value;

      this.firebase.updateVolunteerDob(this.userId, newDob);
      //(<HTMLInputElement>document.getElementById("displayUpdateDob")).innerHTML = updateDobVal + "    " + day + "    " + month + "    " + year;
      (<HTMLInputElement>document.getElementById("displayUpdateDob")).innerHTML = "<span style='color: green;'> Date of birth changed to </span>" + '<div style="color: green">' + newDob + " </div>";
      (<HTMLInputElement>document.getElementById("updateDob")).value = '';
    }
  }
}
