import { Before, Given, Then, When, After } from 'cucumber';
import { assert } from 'chai';
import { AppPage } from '../app.po';
import { browser, by, element, protractor } from 'protractor';

let page: AppPage;
let organizerID: any;
let eventID: any;
let createdEvent: boolean;
let createdOrganizer: boolean;
let sleeptime: number;

// SET UP AND TEARDOWN

Before(() => {
  page = new AppPage();
  createdEvent = false;
  createdOrganizer = false;
  organizerID = "";
  eventID = "";
  sleeptime = 500;
});

After(() => {
  if (createdOrganizer) {
    browser.executeScript(function () {
      const Http = new XMLHttpRequest();
      Http.open("DELETE", 'https://ecse428-5c703-default-rtdb.firebaseio.com/organizer/' + arguments[0] + ".json");
      Http.send();
    }, organizerID);
  }

  if (createdEvent) {
    browser.executeScript(function () {
      const Http = new XMLHttpRequest();
      Http.open("DELETE", 'https://ecse428-5c703-default-rtdb.firebaseio.com/event/' + arguments[0] + ".json");
      Http.send();
    }, eventID);
  }
})


// Scenario Outline 1: Delete an event by the appropriate organizer (Normal Flow)

Given(/^I am an organizer with first name ([^\s]*) and last name ([^\s]*) with an account in the system$/, async (firstName, lastName) => {
  //check if organizer already exists, if so, return its id (by injecting XMLHttpRequest)
  var organizerExists = await browser.executeScript(function () {
    const url = 'https://ecse428-5c703-default-rtdb.firebaseio.com/organizer.json?orderBy=\"first_name\"&equalTo=\"' + arguments[0] + '\"';
    const Http = new XMLHttpRequest();
    Http.open("GET", url, false); //false for SYNCH request so we can check result
    Http.send();

    if (Http.response === "{}") {
      return false //no entry found for this first name
    } else {
      //otherwise, check last name entries:
      var res = JSON.parse(Http.response)
      for (var org in res) {
        if (res[org].last_name === arguments[1]) {
          return org //return organizer ID
        }
      }
      return false //did not find any matching last name
    }
  }, firstName, lastName);

  if (organizerExists) {
    organizerID = organizerExists //store existing organizer id
  } else {
    //create a test organizer and store its id
    createdOrganizer = true
    organizerID = await browser.executeScript(function () {
      var testOrganizer = {
        first_name: arguments[0],
        last_name: arguments[1]
      }

      const Http = new XMLHttpRequest();
      Http.open("POST", 'https://ecse428-5c703-default-rtdb.firebaseio.com/organizer.json', false);
      Http.send(JSON.stringify(testOrganizer));

      var response = JSON.parse(Http.response)
      return response["name"]
    }, firstName, lastName);
  }
});

Given(/^an event with event name ([^\s]*) was created by me and exists in the system$/, async (eventName) => {
    //create a test event and store its id
    createdEvent = true
    eventID = await browser.executeScript(function () {
      // new test event
      var testEvent = {
        date: "1999-03-10",
        endTime: "13:30:00",
        name: arguments[0],
        organizer: arguments[1],
        startTime: "12:30:00",
        volunteers: []
      }

      const Http = new XMLHttpRequest();
      Http.open("POST", 'https://ecse428-5c703-default-rtdb.firebaseio.com/event.json', false);
      Http.send(JSON.stringify(testEvent));

      var response = JSON.parse(Http.response)
      return response["name"]
    }, eventName, organizerID);
});

When(/^I am on the delete event page$/, async () => {
  await browser.get(browser.baseUrl + "/delete-event");
});

When(/^I select my name from the organizer list and choose to delete this event$/, async () => {
  //select the organizer
  element(by.id(organizerID)).click();
  await browser.sleep(sleeptime);

  //select the event
  element(by.id(eventID)).click();
  await browser.sleep(sleeptime);

  // click to delete
  var btn = element(by.id('submit-button'));  
  await browser.sleep(sleeptime);
  btn.click();
  await browser.sleep(sleeptime);
});

Then(/^the event with ([^\s]*) will be successfully deleted$/, async (eventName) => {
  //find event in backend does not exist
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
        return true;
      }
    }
  }, eventName);

  assert(!eventExists);
});

Then(/^the system shows that the deletion was sucessful$/, async () => {
  //check message in front end
  var successMsg = element(by.id("success-message")).isDisplayed()
  assert(successMsg);
});



// Scenario Outline 2: Delete an event of another organizer (Error Flow)

Given(/^an event with event name ([^\s]*) that is not created by me exists in the system$/, async (eventName) => {
  //create a test event and store its id
  createdEvent = true
  eventID = await browser.executeScript(function () {
    // new test event
    var testEvent = {
      date: "1999-03-10",
      endTime: "13:30:00",
      name: arguments[0],
      organizer: "not correct organizer",
      startTime: "12:30:00",
      volunteers: []
    }

    const Http = new XMLHttpRequest();
    Http.open("POST", 'https://ecse428-5c703-default-rtdb.firebaseio.com/event.json', false);
    Http.send(JSON.stringify(testEvent));

    var response = JSON.parse(Http.response)
    return response["name"]
  }, eventName);
});

Then(/^the event with ([^\s]*) will not be deleted$/, async (eventName) => {
  //find event in backend still exists
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
        return true;
      }
    }
  }, eventName);

  assert(eventExists);
});


Then(/^the system will display error message "Organizer did not organize selected event"$/, async () => {
  //check message in front end
  var errorMsg = element(by.id("error-message")).isDisplayed()
  assert(errorMsg);
});