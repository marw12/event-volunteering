
import { Before, Given, Then, When, After } from 'cucumber';
import { expect, assert } from 'chai';
import { AppPage } from '../app.po';
import {Volunteer} from "../../../src/app/model/volunteer"
import {Organizer} from "../../../src/app/model/organizer"
import { browser, by, element, protractor } from 'protractor';

let page: AppPage;
let eventID : any;
let createdEvent : boolean;
let sleeptime : number;

Before(() => {
  //todo needed?
  page = new AppPage();
  createdEvent = false;
  eventID = "";
  sleeptime = 500;

  
});

After(() => {

  if (createdEvent){
    browser.executeScript(function (){
      const Http = new XMLHttpRequest();
      Http.open("DELETE", 'https://ecse428-5c703-default-rtdb.firebaseio.com/event/' + arguments[0] + ".json");
      Http.send();
    }, eventID);
  }
  
})

// 1) Scenario: (Normal Flow) Create a New Task


const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}


Given(/^Organizer is logged into the Event Registration system$/, async () => {

    return browser.get(browser.baseUrl);
  });


Given(/^an event "(.*)" exists$/,async (eventName) => {
      //check if event exists already in db, if not, create it
  var eventExists = await browser.executeScript(function() {
    const url='https://ecse428-5c703-default-rtdb.firebaseio.com/event.json?orderBy=\"name\"&equalTo=\"' + arguments[0] +'\"';
    const Http = new XMLHttpRequest()
    Http.open("GET", url, false); //false for SYNCH request so we can check result
    Http.send();
  
    if (Http.response === "{}"){
      return false //no entry found this event
    } else {
      var res = JSON.parse(Http.response)
      for (var event in res){
        return event //return eventID
      }
    }
  }, eventName);

  if (eventExists){
    eventID = eventExists //store existing event id
  } else {
    //create a test event and store its id
    createdEvent = true
    eventID = await browser.executeScript(function() {
      // new test event
      var testEvent =  {
        date: "1999-03-10",
        endTime: "13:30:00",
        name: arguments[0],
        organizer: "skakassdsd",
        startTime: "12:30:00",
        volunteers: [],
        tasks: []
      }
     
      const Http = new XMLHttpRequest();
      Http.open("POST", 'https://ecse428-5c703-default-rtdb.firebaseio.com/event.json', false);
      Http.send(JSON.stringify(testEvent));
     
      var response = JSON.parse(Http.response)
      return response["name"]
     }, eventName);
  }
});


Given(/^"(.*)" has 0 existing tasks$/,async (string) => {

  var myEvent = await browser.executeScript(function() {
    const url='https://ecse428-5c703-default-rtdb.firebaseio.com/event.json?orderBy=\"name\"&equalTo=\"' + arguments[0] +'\"';
    const Http = new XMLHttpRequest()
    Http.open("GET", url, false); //false for SYNCH request so we can check result
    Http.send();

    if (Http.response === "{}"){
      return false //no entry found this event

    } else {
      var res = JSON.parse(Http.response)
      if (res.hasOwnProperty("tasks")){
        return false;
      } else{
        return true;
      }
      
    }
  }, string);
  expect(myEvent == true);
  
});


When(/^requesting the creation of task "(.*)" for event "(.*)"$/, async (string,string2) => {
  await sleep(1000);

  var eventName = element(by.id('eventtask-id'));
  eventName.sendKeys(string2);

  await sleep(1000);

  var taskname = element(by.id('newTask'));
  taskname.sendKeys(string);

  await sleep(1000);

  var addTaskButton = element(by.id('addTask-button'));
  addTaskButton.click();
  });


Then(/^task "(.*)" is created for event "(.*)"$/,async (string,string2) => {
  await sleep(1000);
  //expect(await element(by.id('eventTaskMessage')).getText()).to.equal('Event Task Successfully Created');
  expect(await element(by.id('eventTaskMessage')).getText()).to.equal('Event Task Successfully Created');
  browser.executeScript(function (){
    const Http = new XMLHttpRequest();
    Http.open("DELETE", 'https://ecse428-5c703-default-rtdb.firebaseio.com/event/' + arguments[0] + ".json");
    Http.send();
  }, eventID);

});

// 3) Scenario: (Error Flow) Attempt to Create a Duplicate Task


Given(/^a task ExistingTask is created for event "(.*)"$/,async (string) => {
  await sleep(1000);

  var eventName = element(by.id('eventtask-id'));
  eventName.sendKeys("ExistingTask");

  await sleep(1000);

  var taskname = element(by.id('newTask'));
  taskname.sendKeys(string);

  await sleep(1000);

  var addTaskButton = element(by.id('addTask-button'));
  addTaskButton.click();
});


Then(/^the "(.*)" error message is issued$/, async (string) => {
  await sleep(1000);
  expect(await element(by.id('eventTaskMessage')).getText()).to.equal(string);
});

Then(/^only 1 ExistingTask task exists for event "(.*)"$/, async (string) => {
    return browser.get(browser.baseUrl);
});


// 4) Scenario: (Error Flow) Attempt to Create a Task as a Volunteer

Given(/^Volunteer is logged into the Event Registration system$/, async () => {

    return browser.get(browser.baseUrl);
  });


Then(/^0 tasks exist for event "(.*)"$/, async (string) => {
    
  console.log("FIRsTHELLOEOELEOELEOE");
  var myEvent = await browser.executeScript(function() {
    const url='https://ecse428-5c703-default-rtdb.firebaseio.com/event.json?orderBy=\"name\"&equalTo=\"' + arguments[0] +'\"';
    const Http = new XMLHttpRequest()
    Http.open("GET", url, false); //false for SYNCH request so we can check result
    Http.send();

    if (Http.response === "{}"){
      return false //no entry found this event

    } else {
      var res = JSON.parse(Http.response)
      if (res.hasOwnProperty("tasks")){
        return false;
      } else{
        return true;
      }
      
    }
  }, string);
  expect(myEvent == true);
  
  });