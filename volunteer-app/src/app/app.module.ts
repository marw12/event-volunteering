import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EventRegistrationComponent } from './event-registration/event-registration.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateVolunteerComponent } from './create-volunteer/create-volunteer.component';
import { CreateOrganizerComponent } from './create-organizer/create-organizer.component';
import { AddEventTasksComponent } from './add-event-tasks/add-event-tasks.component';
import { VolunteerUnregisterEventComponent } from './volunteer-unregister-event/volunteer-unregister-event.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AssignTaskComponent } from './assign-task/assign-task.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { DeleteEventComponent } from './delete-event/delete-event.component';
import { UpdateEventComponent } from './update-event/update-event.component';
import { AddCommentEventVolunteerComponent } from './add-comment-event-volunteer/add-comment-event-volunteer.component';
import { AddEventNoteComponent } from './add-event-note/add-event-note.component';


var firebaseConfig = {
  apiKey: "AIzaSyAxq4Bb-wcQ3Hmg-8lqMqaXciTpd699Jw0",
  authDomain: "ecse428-5c703.firebaseapp.com",
  projectId: "ecse428-5c703",
  storageBucket: "ecse428-5c703.appspot.com",
  messagingSenderId: "451791993914",
  appId: "1:451791993914:web:25e696a31b303adb1b0903",
  measurementId: "G-XXVJ6QLKF9"
};

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LoginComponent,
    SignupComponent,
    CreateEventComponent,
    CreateVolunteerComponent,
    EventRegistrationComponent,
    CreateEventComponent,
    CreateOrganizerComponent,
    CreateOrganizerComponent,
    VolunteerUnregisterEventComponent,
    HomepageComponent,
    AssignTaskComponent,
    AddEventTasksComponent,
    UpdateUserComponent,
    DeleteEventComponent,
    UpdateEventComponent,
    AddCommentEventVolunteerComponent,
    AddEventNoteComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
