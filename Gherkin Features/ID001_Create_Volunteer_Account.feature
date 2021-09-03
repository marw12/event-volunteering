# Backlog Item ID001 | ECSE 428 Group 3 | Created by Marwan Khan, 260762251

Feature: Create account for volunteer

User Story:
As a volunteer
I want to be able to create a volunteer account
With my email and password
So that I can start regestering for events


  Scenario: (Normal Flow) I succesfully create a volunteer account with valid email, password, name and provide extra profile details.
    Given I am on volunteer signup page
     When I enter my email, password, first name, last name
      And I enter extra profile details
      And I request to create volunteer account
     Then the system indicates that the volunteer account has been successfully created
  
  Scenario: (Alternate Flow) I succesfully create a volunteer account with valid email, password, name and no extra profile details.
    Given I am on volunteer signup page
     When I enter my first name, last name, email, password
      And I enter no extra profile details
      And I request to create volunteer account
     Then the system indicates that the volunteer account has been successfully created
  
  Scenario: (Error Flow) I don't successfully create a volunteer account because I input an invalid email
    Given I am on volunteer signup page
     When I eneter an existing email
      And I request to create volunteer account
     Then the system warns me that I have entered an existing email
    
