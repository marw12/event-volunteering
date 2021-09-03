# Sami Hilal feature ID012

Feature: Volunteer assigns themselves to a task in an event

As a Volunteer, I would like to assign myself to a task in an event so that I can help the Organizer.

Scenario: Pick A Task Offered In An Event (Normal Flow)

Given I am registered as user Volunteer
And the event FoodDrive exists
And the tasks have been initialized
When the task Courier has been selected
Then I should see the task Courier in my calandar

Scenario: Pick Sevral Non-Conficting Tasks Offered In An Event (Alternate Flow)

Given I am registered as user Volunteer
And the event HomelessShelter exists
And the tasks have been initialized
When the following tasks are requested
	|Task		|Start time		|End time		|
	|Janitor	|2021-03-22-19-30-00	|2021-03-22-20-30-00 	|
	|Cafeteria	|2021-03-24-19-30-00	|2021-03-24-20-30-00	|
	|Laundry	|2021-03-25-19-30-00	|2021-03-25-20-30-00	|
Then I should see the tasks Janitor, Cafeteria, and Laundry in my calandar

Scenario: Pick Sevral Time-Conficting Tasks Offered In An Event (Error Flow)

Given I am registered as user Volunteer
And the event OldFolksHome exists
And the tasks have been initialized
When the following tasks are requested
	|Task		|Start time		|End time		|
	|Janitor	|2021-03-22-19-30-00	|2021-03-22-20-30-00 	|
	|Cafeteria	|2021-03-22-20-00-00	|2021-03-22-20-30-00	|
Then I should not see the tasks Janitor and Cafeteria in my calandar