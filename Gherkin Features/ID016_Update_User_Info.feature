# Backlog Item ID016 | ECSE 428 Group 3 | Created by Matteo Barbieri, 260805184

As a User, I would like to modify my profile so that I keep my profile information up to date.

Feature: Update user/profile information

Scenario: Update name and email (Normal Flow)
     
Given I am logged in with user Walid
When I choose to update my profile information
And I provide a new valid email "someone@gmail.com"
And I provide a new first name
And I provide a new last name
Then my profile information is updated


Scenario: Update Password (Alternate Flow)

Given I am logged in with user Walid
When I choose to update my password
And I provide a new valid password
And I provide my current password
Then my password is changed
And the system indicates that my profile has been successfully updated


Scenario Outline: Update email with invalid email (Error Flow)

Given I am logged into the Event Registration system
When I choose to update my email
And I provide an invalid email <email>
Then my email is not updated
And the system warns me that the email provided is invalid

Examples:
|email		 |
|someonegmail.com|

Scenario Outline: Update email with email that already exists in the system (Error Flow)

Given I am logged into the Event Registration system
And the system already contains an account associated with <email>
When I choose to update my email
And I provide a valid email <email>
Then my email is not updated
And the system warns me that the email is already associated to an account in the system

Examples:
|email		 |
|someonegmail.com|

Scenario: Update Password with invalid password (Error Flow)

Given I am logged into the Event Registration system
When I choose to update my Password
And I provide an invalid password
And I provide my current password
Then my password is not updated
And the system warns me that the email is already associated to an account in the system





     
