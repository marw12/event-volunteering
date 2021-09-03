
import { Before, Given, Then, When, After } from 'cucumber';
import { expect, assert } from 'chai';
import { browser, by, element, protractor } from 'protractor';

// 1) Scenario: (Normal Flow) I succesfully create a volunteer account with valid email, password, name and provide extra profile details.
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

Before(async () => {
  var volunteerExists = await browser.executeScript(function () {
    const url = 'https://ecse428-5c703-default-rtdb.firebaseio.com/volunteer.json?orderBy=\"first_name\"&equalTo=\"' + "Harry" + '\"';
    const Http = new XMLHttpRequest();
    Http.open("GET", url, false); //false for SYNCH request so we can check result
    Http.send();

    if (Http.response === "{}") {
      return false //no entry found for this first name
    } else {
      //otherwise, check last name entries:
      var res = JSON.parse(Http.response)
      for (var vol in res) {
        if (res[vol].last_name === "Potter") {
          return vol //return volunteer ID
        }
      }
      return false //did not find any matching last name
    }
  });

  if (volunteerExists) {
    var volunteerID = volunteerExists //store existing volunteer id
    browser.executeScript(function () {
      const Http = new XMLHttpRequest();
      Http.open("DELETE", 'https://ecse428-5c703-default-rtdb.firebaseio.com/volunteer/' + arguments[0] + ".json");
      Http.send();
    }, volunteerID);
  }

  await sleep(500);

  var volunteerExists = await browser.executeScript(function () {
    const url = 'https://ecse428-5c703-default-rtdb.firebaseio.com/volunteer.json?orderBy=\"first_name\"&equalTo=\"' + "Elon" + '\"';
    const Http = new XMLHttpRequest();
    Http.open("GET", url, false); //false for SYNCH request so we can check result
    Http.send();

    if (Http.response === "{}") {
      return false //no entry found for this first name
    } else {
      //otherwise, check last name entries:
      var res = JSON.parse(Http.response)
      for (var vol in res) {
        if (res[vol].last_name === "Musk") {
          return vol //return volunteer ID
        }
      }
      return false //did not find any matching last name
    }
  });

  if (volunteerExists) {
    var volunteerID = volunteerExists //store existing volunteer id
    browser.executeScript(function () {
      const Http = new XMLHttpRequest();
      Http.open("DELETE", 'https://ecse428-5c703-default-rtdb.firebaseio.com/volunteer/' + arguments[0] + ".json");
      Http.send();
    }, volunteerID);
  }

  await sleep(500);
});


Given(/^I am on volunteer signup page$/, async () => {
  return browser.get(browser.baseUrl + "/signup-volunteer");
});


When(/^I enter my email, password, first name, last name$/, async () => {
  var firstName = element(by.id('firstName'));
  firstName.sendKeys("Harry");
  await sleep(700);

  var lastName = element(by.id('lastName'));
  lastName.sendKeys("Potter");
  await sleep(700);

  var emailAddress = element(by.id('emailAddress'));
  emailAddress.sendKeys("harry.pot@gmail.com");
  await sleep(700);

  var password = element(by.id('password'));
  password.sendKeys("1234abcd");
});


When(/^I enter extra profile details$/, async () => {
  var phoneNumber = element(by.id('phoneNumber'));
  phoneNumber.sendKeys("5146640022");
  await sleep(1000);

  var dob = element(by.id('dob'));
  dob.sendKeys("1995-11-20");
  await sleep(1000);
  
});


When(/^I request to create volunteer account$/, async () => {
  await sleep(700);
  var signup_btn = element(by.css(".signup-volunteer-btn"));
  browser.sleep(500);
  signup_btn.click();
});


Then(/^the system indicates that the volunteer account has been successfully created$/, async () => {
  await sleep(500);
  expect(await element(by.id('display')).getText()).to.equal('Acount Successfully Created');
});



// 2) Scenario: (Alternate Flow) I succesfully create a volunteer account with valid email, password, name and no extra profile details.
When(/^I enter my first name, last name, email, password$/, async () => {
  var firstName = element(by.id('firstName'));
  firstName.sendKeys("Elon");
  await sleep(1000);

  var lastName = element(by.id('lastName'));
  lastName.sendKeys("Musk");
  await sleep(1000);

  var emailAddress = element(by.id('emailAddress'));
  emailAddress.sendKeys("elon.musk@gmail.com");
  await sleep(1000);

  var password = element(by.id('password'));
  password.sendKeys("abcd1234");
});


When(/^I enter no extra profile details$/, async () => {
  var phoneNumber = element(by.id('phoneNumber'));
  phoneNumber.sendKeys("");
  await sleep(1000);

  var dob = element(by.id('dob'));
  dob.sendKeys("");
  await sleep(1000);
});


  Then(/^the system indicates that the volunteer account has been successfully created.$/, async () => {
    await sleep(500);
    expect(await element(by.id('display')).getText()).to.equal('Acount Successfully Created');
    //expect(await element(by.id('display')).getText()).to.equal('');
});



// 3) Scenario: (Error Flow) I don't successfully create a volunteer account because I input an invalid email


When(/^I eneter an existing email$/, async () => {
  var firstName = element(by.id('firstName'));
  firstName.sendKeys("Peter");
  await sleep(1000);

  var lastName = element(by.id('lastName'));
  lastName.sendKeys("Parker");
  await sleep(1000);

  var emailAddress = element(by.id('emailAddress'));
  emailAddress.sendKeys("notspidey@gmail.com");
  await sleep(1000);

  var password = element(by.id('password'));
  password.sendKeys("abcd1234");
});

Then(/^the system warns me that I have entered an existing email$/, async () => {
  await sleep(1000);
  expect(await element(by.id('display')).getText()).to.equal('Error: Email Already Exists');
});