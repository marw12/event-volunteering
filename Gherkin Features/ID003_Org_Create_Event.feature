# Ragheed Qasmieh feature ID003
Feature: Create Event

    As an organizer, I would like to be able to add/create an event so that
	volunteers can register/be assigned for the tasks that will be created later for the event.

Scenario Outline: Create a New Event (Normal Flow)

Given Organizer is logged into the Event Registration system 
When requesting the creation of event <EventName>, of <Catetgory>, from <StartTime> to <EndTime> 
Then event <EventName> is created in the system
And message indicating successful event creation is issued
Examples:
	| EventName | Category  | StartTime           | EndTime            |
	| NewEvent  | Category1 | 2021-03-14-15-00-00 | 2021-03-14-17-00-00|
	| Event1    | Category2 | 2021-02-11-16-00-00 | 2021-02-12-08-00-00|


Scenario Outline: Create Event withhout Category (Alternate Flow)

Given Organizer is logged into the Event Registration system
When requesting the creation of event <EventName> from <StartTime> to <EndTime> 
Then event <EventName> is created in the system
And message indicating successful event creation is issued
Examples:
	| EventName | Category  | StartTime           | EndTime            |
	| NewEvent  | Null      | 2021-03-15-15-00-00 | 2021-03-15-17-00-00|


Scenario: Attempt to Create a Duplicate Event (Error Flow)

Given Organizer is logged into the Event Registration system
And an event "NewEvent" already exists 
When requesting the creation of event "NewEvent"
Then an "Event already exists" error message is issued 

Scenario: Attempt to Create an Event without a name (Error Flow)

Given Volunteer is logged into the Event Registration system
When requesting the creation of an event without a name
Then a "Name is required to create an event" error message is issued

Scenario: Attempt to Create an Event without a start time (Error Flow)

Given Volunteer is logged into the Event Registration system
When requesting the creation of an event "NewEvent" with no start time
Then a "Start time is required to create an event" error message is issued

Scenario: Attempt to Create an Event without an end time (Error Flow)

Given Volunteer is logged into the Event Registration system
When requesting the creation of event "NewEvent" with no end time
Then a "End time is required to create an event" error message is issued
