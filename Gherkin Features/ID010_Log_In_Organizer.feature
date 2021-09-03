# Backlog item ID010

Feature: Log in as an organizer

As an organizer, I want to be able to log into my account in the application 
with my username or email, and password
so that I can access my home page


#Normal Flow
Scenario: Log in successfully with username
	Given I (an organizer) have an account
	When my username "validOrganizer" is entered
	And my password "validPassword" is entered
	Then I log in successully
	And I am sent to my home page
	
	
#Alternate Flow
Scenario: Log in successfully with email address
	Given I (an organizer) have an account
	When my email address "validOrganizer@email.com" is entered
	And my password "validPassword" is entered
	Then I log in successully
	And I am sent to my home page

#Error flow
Scenario: Log in with incorrect username
	Given I (an organizer) have an account
	When username "invalidOrganizer" is entered
	And my password "validPassword" is entered
	Then I cannot log in
	And I get an "invalid username" message


#Error flow
Scenario: Log in with incorret password
	Given I (an organizer) have an account
	When my username "validOrganizer" is entered
	And password "invalidPassword" is entered
	Then I cannot log in
	And I get an "invalid password" message
	

#Error flow
Scenario: Log in with incorret email address
	Given I (an organizer) have an account
	When email address "invalidOrganizer@email.com" is entered
	And password "validPassword" is entered
	Then I cannot log in
	And I get an "invalid email address" message