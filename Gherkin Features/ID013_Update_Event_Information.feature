# Backlog item ID013

Feature: Organizers shall be able to update event details

As an Organizer, I want to be able to update the name,
date, start time and end time of my event


Scenario Outline: Update the name of the event (Normal Flow)

Given I am on the update event page
When I enter a new valid name for my event
And I click the update name button
Then the event name has been successfully updated


Scenario Outline: Update the start and end time of the event (Alternate Flow)

Given I am on the update event page
When I enter a new valid start time for my event
And I enter a new valid end time for my event
And I click the update time button
Then the start and end time for my event have been successfully updated


Scenario Outline: Update the date of the event (Alternate Flow)

Given I am on the update event page
When I enter a new date valid for my event
And I click the update date button
Then the event date has been successfully updated


Scenario Outline: Update the event with an invalid date (Error Flow)

Given I am on the update event page
When I enter a new invalid date for my event
And I click the update date button
Then the event date has not been updated
And an error message pops up