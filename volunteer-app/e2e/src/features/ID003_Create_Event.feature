# Ragheed Qasmieh feature ID003
Feature: Create Event

  As an organizer, I would like to be able to add/create an event so that
	volunteers can register/be assigned for the tasks that will be created later for the event.

Scenario Outline: Create a New Event (Normal Flow)

Given I am on the event page
When requesting the creation of event <EventName>, of <Category>, on <Date>, from <StartTime> to <EndTime> 
Then event <EventName> is created in the system
Examples:
	| EventName | Category  | Date           | StartTime | EndTime  |
	| EventTest | Category1 | 2021-03-15     | 08:00 AM  | 10:00 AM |

Scenario Outline: Create Event without Category (Alternate Flow)

Given I am on the event page and want to create an event without category
When requesting the creation of event <EventName>, on <Date>, from <StartTime> to <EndTime> 
Then event <EventName> without a category is created in the system
Examples:
	| EventName  | Date        | StartTime  | EndTime  |
	| EventTest  | 2021-03-15  | 08:00 AM   | 10:00 AM |

Scenario Outline: Attempt to Create an event without a name (Error Flow)

Given I am on the event page and want to create an event without a name
When requesting the creation of event on <Date>, from <StartTime> to <EndTime> 
Then a "Name is required to create an event" error message is issued
Examples:
	| Date        | StartTime  | EndTime  |
	| 2021-03-15  | 08:00 AM   | 10:00 AM |