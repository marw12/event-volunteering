# Backlog item ID017 | ECSE 428 Group 3 | Arianit Vavla, 260868601
Feature: Volunteer unassigns from event
As a Volunteer, I want to be able to unassign myself from an event 
so that I would be able to change my plans.


Scenario Outline: Unregister myself from an event (Normal Flow)

Given I am logged in as Volunteer
When I reqeust to unregister from event <EventName>
Then a message indicating unsuccessful registration is issued

Examples:
	| EventName |
	| FoodDrive |


Scenario Outline: Attempt to unregister from event without select one (Error Flow)

Given I am logged in as Volunteer
When I request to unregister without selecting an event
Then an error message is issued