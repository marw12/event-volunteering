import { Before, Given, Then, When, After } from 'cucumber';
import { expect, assert } from 'chai';
import { browser, by, element, protractor } from 'protractor';

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }
  
  Before(async () => {
    var organizerExists = await browser.executeScript(function () {
      const url = 'https://ecse428-5c703-default-rtdb.firebaseio.com/organizer.json?orderBy=\"first_name\"&equalTo=\"' + "Harry" + '\"';
      const Http = new XMLHttpRequest();
      Http.open("GET", url, false); //false for SYNCH request so we can check result
      Http.send();
  
      if (Http.response === "{}") {
        return false //no entry found for this first name
      } else {
        //otherwise, check last name entries:
        var res = JSON.parse(Http.response)
        for (var org in res) {
          if (res[org].last_name === "Holmes") {
            return org 
          }
        }
        return false //did not find any matching last name
      }
    });
  
    if (organizerExists) {
      var organizerID = organizerExists 
      browser.executeScript(function () {
        const Http = new XMLHttpRequest();
        Http.open("DELETE", 'https://ecse428-5c703-default-rtdb.firebaseio.com/organizer/' + arguments[0] + ".json");
        Http.send();
      }, organizerID);
    }
  
    await sleep(1000);
  
    var organizerExists = await browser.executeScript(function () {
      const url = 'https://ecse428-5c703-default-rtdb.firebaseio.com/organizer.json?orderBy=\"first_name\"&equalTo=\"' + "Elon" + '\"';
      const Http = new XMLHttpRequest();
      Http.open("GET", url, false); //false for SYNCH request so we can check result
      Http.send();
  
      if (Http.response === "{}") {
        return false //no entry found for this first name
      } else {
        //otherwise, check last name entries:
        var res = JSON.parse(Http.response)
        for (var org in res) {
          if (res[org].last_name === "Thing") {
            return org 
          }
        }
        return false //did not find any matching last name
      }
    });
  
    if (organizerExists) {
      var organizerID = organizerExists 
      browser.executeScript(function () {
        const Http = new XMLHttpRequest();
        Http.open("DELETE", 'https://ecse428-5c703-default-rtdb.firebaseio.com/organizer/' + arguments[0] + ".json");
        Http.send();
      }, organizerID);
    }
  
    await sleep(700);
  });

  Given(/^I am on organizer signup page$/, async () => {
    return browser.get(browser.baseUrl + "/signup-organiser");
  });
  
  When(/^I provide a valid email$/, async () => {
    var emailAddress = element(by.id('emailAddress'));
    emailAddress.sendKeys("sherlockholmes@gmail.ca");
    await sleep(1000);
  });

  When(/^I provide a valid password$/, async () => {
    var password = element(by.id('password'));
    password.sendKeys("abcd1234");
    await sleep(1000);
  });

  When(/^I provide a first name$/, async () => {
    var firstName = element(by.id('firstName'));
    firstName.sendKeys("Sherlock");
    await sleep(1000);;
  });
  When(/^I provide a last name$/, async () => {
    var lastName = element(by.id('lastName'));
    lastName.sendKeys("Holmes");
    await sleep(1000);
  });

  When(/^I provide other profile information$/, async () => {
    var phoneNumber = element(by.id('phoneNumber'));
    phoneNumber.sendKeys("5146640022");
    await sleep(1000);
  
    var dob = element(by.id('dob'));
    dob.sendKeys("1998-01-20");
    await sleep(1000);
  });
  When(/^I request to create organizer account$/, async () => {
    await sleep(1000);
    var signup_btn = element(by.css(".signup-organizer-btn"));
    browser.sleep(500);
    signup_btn.click();
  });
  
  Then(/^the system indicates that the organizer account has been successfully created$/, async () => {
    await sleep(1000);
    expect(await element(by.id('display')).getText()).to.equal('Account Successfully Created');
  });

  When(/^I provide a new valid email$/, async () => {
    var emailAddress = element(by.id('emailAddress'));
    emailAddress.sendKeys("something@hotmail.ca");
    await sleep(1000);
    
  });
  When(/^I provide a new first name$/, async () => {
    var firstName = element(by.id('firstName'));
    firstName.sendKeys("Some");
    await sleep(1000);;
  });
  When(/^I provide a new last name$/, async () => {
    var lastName = element(by.id('lastName'));
    lastName.sendKeys("Thing");
    await sleep(1000);
  });

  When(/^I provide no other profile information$/, async () => {
    var phoneNumber = element(by.id('phoneNumber'));
    phoneNumber.sendKeys("");
    await sleep(1000);
  
    var dob = element(by.id('dob'));
    dob.sendKeys("");
    await sleep(1000);


  });

  When(/^I provide an existing valid email$/, async () => {
    var emailAddress = element(by.id('emailAddress'));
    emailAddress.sendKeys("joedoe@hotmail.ca");
    await sleep(1000);
  });

  Then(/^the system warns me that the email is already associated to an account in the system$/, async () => {
    await sleep(1000);
    expect(await element(by.id('display')).getText()).to.equal('Error: Email Already Exists');
  });
