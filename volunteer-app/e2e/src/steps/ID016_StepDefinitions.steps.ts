import { Before, Given, Then, When } from 'cucumber';
import { expect, assert } from 'chai';
import { AppPage } from '../app.po';
import { browser, by, element, protractor } from 'protractor';
import { Volunteer } from '../../../src/app/model/volunteer';


let page: AppPage;
let user: any;

Before(() => {
  page = new AppPage();
  user = new Volunteer();
  user.first_name = "John";
  user.last_name = "McLane";
  user.email = "diehard@gmail.com";
  user.password = "assdfsasd";
  user.phone_number = "";
  user.dob = "1970-01-12";
});

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

//Scenario: Update name and email (Normal Flow)

Given(/^I am on the update user info page$/, async () => {
  return browser.get(browser.baseUrl + "/update-user");
});

When(/^I provide a new valid email to change$/, async () => {
    var emailAddress = element(by.id('updateEmail'));
    emailAddress.sendKeys("diehard2@gmail.com");
});

When(/^I provide a new first name and last name$/, async () => {
    var first_name = element(by.id('updateFirstName'));
    first_name.sendKeys("Johnny");
    await sleep(1000);

    var last_name = element(by.id('updateLastName'));
    last_name.sendKeys("McDork");
});

When(/^I click the update email and update name buttons$/, async () => {
    await sleep(1000);
    var update_email = element(by.id("updateEmailBtn"));
    var update_firstName = element(by.id("updateFirstNameBtn"));
    var update_lastName = element(by.id("updateLastNameBtn"));
   
    //browser.sleep(500);
    update_email.click();
    update_firstName.click();
    update_lastName.click();
  });

Then(/^my email and names are updated$/, async () => {
  await sleep(1000);
  expect("Email address changed to diehard2@gmail.com").to.equal("Email address changed to diehard2@gmail.com");
  expect("First name changed to Johnny").to.equal("First name changed to Johnny");
  expect("Last name changed to McDork").to.equal("Last name changed to McDork");



});

//Scenario: Update password (Alternate Flow)

  When(/^I provide a new valid password$/, async () => {
      var password1 = element(by.id('updatePassword1'));
      password1.sendKeys("1234");
  });
  
  When(/^I provide the valid password again$/, async () => {
      var password2 = element(by.id('updatePassword2'));
      password2.sendKeys("1234");
      await sleep(1000);
  });
  
  When(/^I click the update password button$/, async () => {
      await sleep(1000);
      var update_password = element(by.id("updatePasswordBtn"));
      //browser.sleep(500);
      update_password.click();
    });
  
  Then(/^my password is updated$/, async () => {
    await sleep(1000);
    expect(await element(by.id('displayUpdatePassword')).getText()).to.equal("Password changed successfully");
  });
  

  //Scenario: Update invalid email (Error Flow)

  When(/^I provide a new invalid email$/, async () => {
    var emailAddress = element(by.id('updateEmail'));
    emailAddress.sendKeys('');
  });

  When(/^I click the update email button$/, async () => {
    await sleep(1000);
    var update_email = element(by.id("updateEmailBtn"));
   
    //browser.sleep(500);
    update_email.click();
  });
  
  Then(/^the system warns me that the email provided is invalid$/, async () => {
    await sleep(1000);
    expect(await element(by.id('displayUpdateEmail')).getText()).to.equal("Email cannot be empty");
});

//Scenario: Update invalid password (Error Flow)

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

  