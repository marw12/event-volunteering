import { Before, Given, Then, When, And } from 'cucumber';
import { expect, assert } from 'chai';
import { AppPage } from '../app.po';
import { browser, by, element, protractor } from 'protractor';


let page: AppPage;
let volunteeremail = "chowvolunteer@mail.com";
let organizeremail = "jeremyorganizer@mail.com"
let testEvent = "Christmas Ball"
let password = "password123";


Before(() => {
  page = new AppPage();
});

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

Given(/^I am logged in as an Organizer$/, async () => {
  await browser.get(browser.baseUrl + "/login");
  var emailInput = element(by.id('emailLogin'));
  var passwordInput = element(by.id('passwordLogin'));
  var loginButton = element(by.id('loginbtn'));

  emailInput.sendKeys(organizeremail);
  passwordInput.sendKeys(password);

  await sleep(1000);
  loginButton.click();
  await sleep(1500);
});

Given(/^I am logged in as an Volunteer$/, async () => {
  await browser.get(browser.baseUrl + "/login");
  var emailInput = element(by.id('emailLogin'));
  var passwordInput = element(by.id('passwordLogin'));
  var loginButton = element(by.id('loginbtn'));

  emailInput.sendKeys(volunteeremail);
  passwordInput.sendKeys(password);

  await sleep(1000);
  loginButton.click();
  await sleep(1500);
});

Given(/^I am the owner of the event "(.*)"$/, async (string) => {
  await sleep(1000);
  element(by.id('eventnote-id')).sendKeys(string);
});

Given(/^I am not the owner of the event "(.*)"$/, async (string) => {
  await sleep(1000);
  element(by.id('eventnote-id')).sendKeys(string);
});


When(/^I request to add a note "(.*)" to the event "(.*)"$/, async (string1, string2) => {
  await sleep(1000);
  var addEventNoteButton = element(by.id('addEventNote-button'));
  addEventNoteButton.click();
});



Then(/^the note is added to the event$/, async () => {
  await sleep(1000);
  var successMsg = "Event Note Successfully Created";
  expect(await element(by.id('addEventNoteResponse')).getText()).to.equal(successMsg);
});

Then(/^the system does not allow me to add the note$/, async () => {
  await sleep(1000);
  var errorMsg = "ERROR: Only the organizer of the event can add note"
  expect(await element(by.id('addEventNoteResponse')).getText()).to.equal(errorMsg);
});