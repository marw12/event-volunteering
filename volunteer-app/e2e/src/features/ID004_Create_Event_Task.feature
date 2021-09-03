Feature: Create Event Task

    As an organizer, I would like to be able to add/create tasks for an event
    Tasks are individual jobs / tasks that volunteers and/or organizers need to be assigned to for an event

Scenario Outline: Create a New Task (Normal Flow)

Given Organizer is logged into the Event Registration system
Given an event "NewEvent" exists 
And "NewEvent" has 0 existing tasks
When requesting the creation of task "<task>" for event "NewEvent"
Then task "<task>" is created for event "NewEvent"

Examples:
| task       |
| New Task   |




Scenario: Attempt to Create a Duplicate Task (Error Flow)

Given Organizer is logged into the Event Registration system
Given an event "NewEvent" exists 
And "NewEvent" has 0 existing tasks
And a task ExistingTask is created for event "NewEvent"
When requesting the creation of task "ExistingTask" for event "NewEvent"
Then the "Task already exists" error message is issued 
And only 1 ExistingTask task exists for event "NewEvent"
