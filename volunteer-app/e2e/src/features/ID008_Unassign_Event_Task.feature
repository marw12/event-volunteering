Feature: Organizers shall be able to remove tasks for an event

As an Organizer, I want to be able to remove tasks from my event
so that it can stay up to date


Scenario: Succesfully remove a task (Normal Flow)

Given I am on the unassign task event page
When I select a task for a specific event that can be removed
And I click the remove task button
Then the task has been succesfully removed


Scenario: Unsuccessfully remove a task (Error Flow)

Given I am on the event page
When I select a task for a specific event I don't own
And I click the remove task button
Then the system warns me the task cannot be removed