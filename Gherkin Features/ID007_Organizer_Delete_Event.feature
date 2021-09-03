# Matthew Langshur 260704964 & Helen Lin 260715521
Feature: Organizer Deletes an Event

  As an organizer, I would like to delete an event that I have created, so that outdated or cancelled events can be removed. 

Scenario Outline: Delete an Event by the appropriate organizer (Normal Flow) 
    Given I am an organizer with first name <firstName> and last name <lastName> with an account in the system
      And an event with event name <eventName> was created by me and exists in the system
     When I am on the delete event page
      And I select my name from the organizer list and choose to delete this event
     Then the event with <eventName> will be successfully deleted
      And the system shows that the deletion was sucessful 

    Examples:
    | firstName | lastName | eventName | 
    | Riley     | Smith    | newEvent1  |
    | Jane      | Doe      | testEvent1 |
    | Scott     | Paul     | myEvent1   |

Scenario Outline: Delete an Event of a Different Organizer (Error Flow)
    Given I am an organizer with first name <firstName> and last name <lastName> with an account in the system
      And an event with event name <eventName> that is not created by me exists in the system
     When I am on the delete event page
      And I select my name from the organizer list and choose to delete this event
     Then the event with <eventName> will not be deleted
      And the system will display error message "Organizer did not organize selected event"

    Examples:
    | firstName | lastName | eventName | 
    | Riley     | Smith    | newEvent1  |
    | Jane      | Doe      | testEvent1 |
    | Scott     | Paul     | myEvent1   |