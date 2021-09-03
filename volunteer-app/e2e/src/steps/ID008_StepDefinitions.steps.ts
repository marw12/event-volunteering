import { Before, Given, Then, When } from 'cucumber';
import { expect, assert } from 'chai';
import { AppPage } from '../app.po';
import { browser, by, element, protractor } from 'protractor';
import { Volunteer } from '../../../src/app/model/volunteer';


let page: AppPage;
let eventID : any;


Before(() => {
  page = new AppPage();
});

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

//Scenario: Succesfully remove a task (Normal Flow)

Given(/^I am on the unassign task event page$/, async () => {
  return browser.get(browser.baseUrl + "/unassign-task-event");
});

When(/^I select a task for a specific event that can be removed$/, async () => {
    element(by.id('eventIdunassignTask')).element(by.cssContainingText('option', 'task1')).click();
});

When(/^I click the remove task button$/, async () => {
    var unassign_task = element(by.id("submit-unassigntaskbutton"));
    unassign_task.click();
});


Then(/^the task has been succesfully removed$/, async () => {
  await sleep(1000);
  expect(await element(by.id('success-message')).getText()).to.equal("Task Removed Succesfully");

});

//Scenario: Unsuccessfully remove a task (Error Flow)

When(/^I select a task for a specific event I don't own$/, async () => {
  element(by.id('eventIdunassignTask')).element(by.cssContainingText('option', 'taskFromEventNotOwned')).click();
});

When(/^I click the remove task button$/, async () => {
    var unassign_task = element(by.id("submit-unassigntaskbutton"));
    unassign_task.click();
});


Then(/^the system warns me the task cannot be removed$/, async () => {
  await sleep(1000);
  expect(await element(by.id("message" )).getText()).to.equal("You do not own the event to remove this task");
});