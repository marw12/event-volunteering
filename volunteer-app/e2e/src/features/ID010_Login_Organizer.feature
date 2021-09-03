Feature: Log in organizer

User Story:
As an organizer
I want to be able to log in to my account
With my email and password
So that I can start creating, organizing, and tracking events


  Scenario: (Normal Flow) I succesfully log in to my organizer account with a valid email and password
    Given I am on the login page
     When I enter my email and password
     And I request to log in
     Then the system indicates that I have been logged in successfully to my account

  
  Scenario: (Error Flow) I don't successfully log in to my organizer account because I input a wrong email
    Given I am on the login page
     When I enter a wrong email and my correct password
     And I request to log in with the wrong email
     Then the system warns me that I have a wrong email
     

  Scenario: (Error Flow) I don't successfully log in to my organizer account because I input a wrong password
    Given I am on the login page
     When I enter my correct email and a wrong password
     And I request to log in with the wrong password
     Then the system warns me that I have a wrong password