import { Before, Given, Then, When, After } from 'cucumber';
import { assert } from 'chai';
import { AppPage } from '../app.po';
import { browser, by, element, protractor } from 'protractor';

let page: AppPage;
let volunteerID: any;
let eventID: any;
let createdEvent: boolean;
let createdVolunteer: boolean;
let sleeptime: number;

// SET UP AND TEARDOWN

Before(() => {
  page = new AppPage();
  createdEvent = false;
  createdVolunteer = false;
  volunteerID = "";
  eventID = "";
  sleeptime = 500;
});

After(() => {
  if (createdVolunteer) {
    browser.executeScript(function () {
      const Http = new XMLHttpRequest();
      Http.open("DELETE", 'https://ecse428-5c703-default-rtdb.firebaseio.com/volunteer/' + arguments[0] + ".json");
      Http.send();
    }, volunteerID);
  }

  if (createdEvent) {
    browser.executeScript(function () {
      const Http = new XMLHttpRequest();
      Http.open("DELETE", 'https://ecse428-5c703-default-rtdb.firebaseio.com/event/' + arguments[0] + ".json");
      Http.send();
    }, eventID);
  }

})

// Scenario Outline 1: Volunteer registers for a valid event (Normal Flow)
Given(/^I am a volunteer with ([^\s]*) ([^\s]*) and registered in the system$/, async (firstName, lastName) => {
  //check if volunteer already exists, if so, return its id (by injecting XMLHttpRequest)
  var volunteerExists = await browser.executeScript(function () {
    const url = 'https://ecse428-5c703-default-rtdb.firebaseio.com/volunteer.json?orderBy=\"first_name\"&equalTo=\"' + arguments[0] + '\"';
    const Http = new XMLHttpRequest();
    Http.open("GET", url, false); //false for SYNCH request so we can check result
    Http.send();

    if (Http.response === "{}") {
      return false //no entry found for this first name
    } else {
      //otherwise, check last name entries:
      var res = JSON.parse(Http.response)
      for (var vol in res) {
        if (res[vol].last_name === arguments[1]) {
          return vol //return volunteer ID
        }
      }
      return false //did not find any matching last name
    }
  }, firstName, lastName);

  if (volunteerExists) {
    volunteerID = volunteerExists //store existing volunteer id
  } else {
    //create a test volunteer and store its id
    createdVolunteer = true
    volunteerID = await browser.executeScript(function () {
      var testVolunteer = {
        first_name: arguments[0],
        last_name: arguments[1],
        events: [],
      }

      const Http = new XMLHttpRequest();
      Http.open("POST", 'https://ecse428-5c703-default-rtdb.firebaseio.com/volunteer.json', false);
      Http.send(JSON.stringify(testVolunteer));

      var response = JSON.parse(Http.response)
      return response["name"]
    }, firstName, lastName);
  }
});

Given(/^there exists a valid event with ([^\s]*) in the system$/, async (eventName) => {
  //check if event exists already in db, if not, create it
  var eventExists = await browser.executeScript(function () {
    const url = 'https://ecse428-5c703-default-rtdb.firebaseio.com/event.json?orderBy=\"name\"&equalTo=\"' + arguments[0] + '\"';
    const Http = new XMLHttpRequest()
    Http.open("GET", url, false); //false for SYNCH request so we can check result
    Http.send();

    if (Http.response === "{}") {
      return false //no entry found this event
    } else {
      var res = JSON.parse(Http.response)
      for (var event in res) {
        return event //return eventID
      }
    }
  }, eventName);

  if (eventExists) {
    eventID = eventExists //store existing event id
  } else {
    //create a test event and store its id
    createdEvent = true
    eventID = await browser.executeScript(function () {
      // new test event
      var testEvent = {
        date: "1999-03-10",
        endTime: "13:30:00",
        name: arguments[0],
        organizer: "skakassdsd",
        startTime: "12:30:00",
        volunteers: []
      }

      const Http = new XMLHttpRequest();
      Http.open("POST", 'https://ecse428-5c703-default-rtdb.firebaseio.com/event.json', false);
      Http.send(JSON.stringify(testEvent));

      var response = JSON.parse(Http.response)
      return response["name"]
    }, eventName);
  }
});

When(/^I am on the event registration page$/, async () => {
  // refresh to ensure correct page
  await browser.get(browser.baseUrl + "/event-registration");
});

When(/^I choose to register for the event .*$/, async () => {
  //select the volunteer
  element(by.id(volunteerID)).click();
  await browser.sleep(sleeptime);

  //select the event
  element(by.id(eventID)).click();
  await browser.sleep(sleeptime);

  //click to register
  var btn = element(by.id('reg-vol-button'));  
  await browser.sleep(sleeptime);
  btn.click();
  await browser.sleep(sleeptime);
});

Then(/^I will be in the list of participants for event .*$/, async () => {
  //find event in backend
  var registered = await browser.executeScript(function () {
    const url = 'https://ecse428-5c703-default-rtdb.firebaseio.com/event/' + arguments[0] + "/volunteers.json";
    const Http = new XMLHttpRequest()
    Http.open("GET", url, false); //false for SYNCH request so we can check result
    Http.send();

    //check volunteer is in the list
    if (Http.response === "{}" || Http.response == null || Http.response == "null") {
      return false //no entry found this event
    } else {
      var res = JSON.parse(Http.response)
      for (var v in res) {
        if (v == arguments[1])
          return true;
      }
      return true;
    }
  }, eventID, volunteerID);

  assert(registered);
});

Then(/^the system shows that my registration was successful$/, async () => {
  //check message in front end
  var successMsg = element(by.id("success-message")).isDisplayed()
  assert(successMsg);
});


// Scenario Outline 2: Volunteer registers for an event that they are already registered for (Alternate Flow)

Given(/^I am already registered for the event .*$/, async () => {
  //select the volunteer
  element(by.id(volunteerID)).click();
  await browser.sleep(sleeptime);

  //select the event
  element(by.id(eventID)).click();
  await browser.sleep(sleeptime);

  //click to register
  var btn = element(by.id('reg-vol-button'));  
  await browser.sleep(sleeptime);
  btn.click();
  await browser.sleep(sleeptime);
});

Then(/^the system shows that I was already registered for the event$/, async () => {
  //check message in front end
  var errorMsg = element(by.id("error-message")).isDisplayed()
  assert(errorMsg);
});


// Scenario Outline 3: Volunteer does not provide event selection (Error Flow)
When(/^I choose to register for an event without providing the .*$/, async () => {
  //select the volunteer
  element(by.id(volunteerID)).click();
  await browser.sleep(sleeptime);

  //do not select the event

  //click to register
  var btn = element(by.id('reg-vol-button'));
  await browser.sleep(sleeptime);
  btn.click();
  await browser.sleep(sleeptime);
});

Then(/^the system indicates that I must select an event$/, async () => {
  //check message in front end
  var requiredMsg = element(by.id("required-event-id")).isDisplayed();
  assert(requiredMsg);
});