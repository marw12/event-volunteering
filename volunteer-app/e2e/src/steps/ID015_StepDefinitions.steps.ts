import { Before, Given, Then, When, And } from 'cucumber';
import { expect, assert } from 'chai';
import { AppPage } from '../app.po';
import { browser, by, element, protractor } from 'protractor';


let page: AppPage;
let email = "john@gmail.com";
let password = "abcd1234";


Before(() => {
  page = new AppPage();
});

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

Given(/^I am already logged in as a Volunteer$/, async () => {
  await browser.get(browser.baseUrl + "/login");
  var emailInput = element(by.id('emailLogin'));
  var passwordInput = element(by.id('passwordLogin'));
  var loginButton = element(by.id('loginbtn'));

  emailInput.sendKeys(email);
  passwordInput.sendKeys(password);

  await sleep(1000);
  loginButton.click();
  await sleep(1500);
});


When(/^I select the event available event Christmas Ball$/, async () => {
  await element(by.id('comment-event-id')).element(by.cssContainingText('option', 'Christmas Ball')).click();
  await sleep(1500);
});

When(/^I enter a valid comment to the event$/, async () => {
  var input = await element(by.id('add-comment-vol'));
  input.sendKeys("here is a valid comment");
  await sleep(1500);
});

When(/^I request to add the comment to the event$/, async () => {
  var btn = await element(by.id('comment-submit-button'));
  await btn.click();
  await sleep(1500);
});

Then(/^I receive a confirmation message that the comment has been added$/, async () => {
  var msg = await element(by.id('success-message-add-comment')).getText();
  expect(msg).to.equal("Successfully added comment to the event!");
});

// Error flow 1
When(/^I select the event Christmas Ball$/, async () => {
  await element(by.id('comment-event-id')).element(by.cssContainingText('option', 'Christmas')).click();
  await sleep(1500);
});


When(/^I enter an empty comment$/, async () => {
  var input = await element(by.id('add-comment-vol'));
  input.sendKeys("");
  await sleep(1500);
});

When(/^I request to add the comment to an event$/, async () => {
  var btn = await element(by.id('comment-submit-button'));
  await btn.click();
  await sleep(1500);
});

Then(/^I receive an error message indicating invalid comment$/, async () => {
  var msg = await element(by.id('message')).getText();
  expect(msg).to.equal("Error: Unable to add comment to the event");
});

// Error flow 2

When(/^I enter a valid comment$/, async () => {
  var input = await element(by.id('add-comment-vol'));
  input.sendKeys("great event");
  await sleep(1500);
});

When(/^I request to add the comment$/, async () => {
  var btn = await element(by.id('comment-submit-button'));
  await btn.click();
  await sleep(1500);
});

Then(/^I receive an error message indicating required event$/, async () => {
  var errormsg = await element(by.id('required-event-id')).getText();
  expect("*required").to.equal(errormsg);
});

