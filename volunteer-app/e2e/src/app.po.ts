import { browser, by, element, protractor } from 'protractor';
import {Volunteer} from "../../src/app/model/volunteer"

//change

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
   
  }

  // async newName(name: string): Promise<void> {
 
  //   var input = element(by.id('nameInput'));
  //   input.sendKeys(name);  
  //   var btn = element(by.css(".update-button"));  
  //   browser.sleep(500);
  //   btn.click();
  //   btn.click();
  // }

  // async getUsername(): Promise<string> {
  //   return element(by.id('username')).getText();
  // }

  async getCheck(): Promise<string> {
    return element(by.id('check')).getText();
  }


  
  async createAllVolenteerFeilds(): Promise<Object> {

    let volunteer: any;
    volunteer = new Volunteer();
    volunteer.first_name = "Harry";
    volunteer.last_name = "Potter";
    volunteer.email = "harry.pot@gmail.com";
    volunteer.password = "1234abcd";
    volunteer.phone_number = "5146640022";
    volunteer.dob = "02/12/2021";
    volunteer.major = "Software Engineering";
    volunteer.year = "U1";

    return volunteer;
  }

  async getEventCreation(): Promise<string> {
    browser.sleep(10000).then(function() {
      console.log('waited 10 seconds');
    });
    return element(by.id('check')).getText();
  }

  async getNotSuccessfulEventCreation(): Promise<string> {
    browser.sleep(10000).then(function() {
      console.log('waited 10 seconds');
    });
    var error = '>> required';
    return error
  }


  async newEvent(name: string, category: string, date: string, sTime: string, eTime: string): Promise<void> {
    //var inputName = element(by.xpath('/html/body/app-root/app-create-event/div/div/div/form/div[1]/input'));
    var inputName = element(by.css('input[formControlName=name]'));
    inputName.sendKeys(name);  

    var inputCategory = element(by.xpath('/html/body/app-root/app-create-event/div/div/div/form/div[2]/input'));
    inputCategory.sendKeys(category);

    var inputDate = element(by.xpath('/html/body/app-root/app-create-event/div/div/div/form/div[3]/input'));
    inputDate.sendKeys(date);  

    var inputSTime = element(by.xpath('/html/body/app-root/app-create-event/div/div/div/form/div[4]/input'));
    inputSTime.sendKeys(sTime);  

    var inputETime = element(by.xpath('/html/body/app-root/app-create-event/div/div/div/form/div[5]/input'));
    inputETime.sendKeys(eTime);  

    var btn = element(by.xpath('/html/body/app-root/app-create-event/div/div/div/form/div[7]/button'));  
  
    btn.click();
    btn.click();
  }
}
