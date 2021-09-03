# Backlog Item ID002 | ECSE 428 Group 3 | Created by Helen Lin, 260715521

Feature: Create account for organizer (ID002)
As an event organizer, I want to be able to create an account with my McGill email,
so that I can start creating, organizing, and tracking events.

  Scenario Outline: (Normal flow) Create a new organizer account with valid email, password, and name, and provide extra user profile details.
    Given I am on organizer signup page
     When I provide a valid email
      And I provide a valid password
      And I provide a first name
      And I provide a last name
      And I provide other profile information
      And I request to create organizer account
     Then the system indicates that the organizer account has been successfully created 

  Scenario Outline: (Alternate flow) Create a new organizer account with valid email, password, name, and no user profile details.
    Given I am on organizer signup page
     When I provide a new valid email 
      And I provide a valid password
      And I provide a new first name
      And I provide a new last name
      And I provide no other profile information
      And I request to create organizer account
      Then the system indicates that the organizer account has been successfully created

  Scenario Outline: (Error flow) Create a new organizer account with an email that already exists in the system.
    Given I am on organizer signup page
     When I provide an existing valid email
      And I provide a valid password
      And I provide a first name
      And I provide a last name
      And I request to create organizer account
      Then the system warns me that the email is already associated to an account in the system

  