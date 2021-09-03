Feature: Update user/profile information

Scenario: Update name and email (Normal Flow)
     
Given I am on the update user info page
When I provide a new valid email to change
And I provide a new first name and last name
And I click the update email and update name buttons
Then my email and names are updated


Scenario: Update Password (Alternate Flow)

Given I am on the update user info page
When I provide a new valid password
And I provide the valid password again
And I click the update password button
Then my password is updated


Scenario Outline: Update email with invalid email (Error Flow)

Given I am on the update user info page
When I provide a new invalid email
And I click the update email button
Then the system warns me that the email provided is invalid

Examples:
|email		 |
|someonegmail.com|


Scenario: Update Password with invalid password (Error Flow)

Given I am on the update user info page
When I provide a new invalid password
And I provide the invalid password again
And I click the update password button
Then the system warns me that the password is invalid