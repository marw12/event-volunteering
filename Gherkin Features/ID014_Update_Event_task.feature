# Benjamin Emiliani 260871228

Feature: Update Event Task

    As an Organizer, I would like to be able to update tasks for an event
    so that the assigned volunteer is informed of the change before the event

Background:
  Given I am logged into the system as an Organizer
  Given I create an event "NewEvent"

Scenario Outline: Update Title of a Task (Normal Flow)

  Given "NewEvent" has one task with title "Old Title"
  When I update task title to "New Title"
  Then the event "NewEvent", has one task with title "New Title"


Scenario: Update Task with Title and Description (Alternate Flow)

  Given "NewEvent" has one task with title "Week 1 Report" and description "Sprint 1 Week 1 Summary"
  When I update task title to "Final Submission" and description to "Completed"
  Then the event "NewEvent", has one task with title "Final Submission" and description "Completed"


Scenario: Attempt to Update Task with empty Title (Error Flow)

  Given "NewEvent" has one task with title "Week 1 Report"
  When I update task title to null
  Then The systems nofities me that title field of task cannot be empty
  And the event "NewEvent", has one task with title "Old Title"
