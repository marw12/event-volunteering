#feature ID015

Feature: Volunteer adds comment to event

As a Volunteer, I shall add a comment to an event, so that the organizer and other volunteers can see my comments.

Background:
Given I am logged in as a Volunteer

Scenario: Add a comment to an event (Normal Flow)
	When I select the event Science Fair
	When I enter a valid comment	
	When I request to add the comment
	Then I receive a confirmation message that the comment has been added


Scenario: Attempt to add a comment which is empty (Error Flow)
	When I select the event Science Fair
	When I enter an empty comment	
	When I request to add the comment to an event
	Then I receive an error message that the comment is invalid