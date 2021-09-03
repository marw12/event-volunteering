# ID006
Feature: Organizer delete account

User Story:
As an organizer
I want to be able to delete my account
So that I don't have an account anymore


  Scenario: (Normal Flow) I succesfully delete my account
    Given I am on my organizer account page
     When I click the delete account button
     And confirm that I want to delete my account
     Then the system indicates that my account has been deleted and logs me out


  Scenario: (Error Flow) I don't successfully delete my account
    Given I am on my organizer account page
     When I click the delete account button
     And don't confirm that I want to delete my account
     Then the system does not delete my account and keeps me logged in
