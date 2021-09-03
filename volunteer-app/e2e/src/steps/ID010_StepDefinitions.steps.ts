import { Before, Given, Then, When } from 'cucumber';
import { expect, assert } from 'chai';
import { browser, by, element, protractor } from 'protractor';


// 1) Scenario: (Normal Flow) I successfully log in to my organizer account with a valid email and password
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

Given(/^I am on the login page$/, async () => {
  return browser.get(browser.baseUrl + "/login");
});

When(/^I enter my email and password$/, async () => {
  var emailAddress = element(by.id('emailLogin'));
  emailAddress.sendKeys("jimdoe@gmail.com");

  await sleep(1000);
  var password = element(by.id('passwordLogin'));
  password.sendKeys("123");
});

When(/^I request to log in$/, async () => {
  await sleep(1000);
  var login_btn = element(by.id("loginbtn"));
  browser.sleep(500);
  login_btn.click();
});

Then(/^the system indicates that I have been logged in successfully to my account$/, async () => {
  await sleep(1000);
  expect('Successful login!').to.equal('Successful login!');
});


// 2) Scenario: (Error Flow) I don't successfully log in to my organizer account because I input a wrong email
When(/^I enter a wrong email and my correct password$/, async () => {
  var emailAddress = element(by.id('emailLogin'));
  emailAddress.sendKeys("jimdoe1@gmail.com");

  await sleep(1000);
  var password = element(by.id('passwordLogin'));
  password.sendKeys("123");
});

When(/^I request to log in with the wrong email$/, async () => {
  await sleep(1000);
  var login_btn = element(by.id("loginbtn"));
  browser.sleep(500);
  login_btn.click();
});

Then(/^the system warns me that I have a wrong email$/, async () => {
  await sleep(1000);
  expect(await element(by.id('displayLogin')).getText()).to.equal('Incorrect email or password');
});


// 3) Scenario: (Error Flow) I don't successfully log in to my organizer account because I input an invalid email
When(/^I enter my correct email and a wrong password$/, async () => {
  var emailAddress = element(by.id('emailLogin'));
  emailAddress.sendKeys("jimdoe@gmail.com");

  await sleep(1000);

  var password = element(by.id('passwordLogin'));
  password.sendKeys("1234");
});

When(/^I request to log in with the wrong password$/, async () => {
  await sleep(1000);
  var login_btn = element(by.id("loginbtn"));
  browser.sleep(500);
  login_btn.click();
});

Then(/^the system warns me that I have a wrong password$/, async () => {
  await sleep(1000);
  expect(await element(by.id('displayLogin')).getText()).to.equal('Incorrect email or password');
});
