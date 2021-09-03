# Benjamin Emiliani 260871228
Feature: Organizer Deletes a Task of an Event

  As an organizer, I would like to delete a task for an event that I have created
  so that it is no longer done by a volunteer 

Background: 
    Given an organizer with first name <firstname> lastname <lastname> and id <id> exists in the system
        Examples:
            |id | firstname | lastname |
            | 1 | John      | Smith    |
            | 2 | Jim       | Doe      |
            | 3 | Scott     | Paul     |

    Given an event with id <id> and event name <eventName> and with organizer <organizerID> and with task <taskName> exists in the system
        Examples:
            | id | eventName  | organizerID |  taskName     |
            | 1  | Club Rouge |      1      | Serve Drinks  |
            | 2  | Tokyo      |      3      | Collect Trash |

Scenario Outline: Delete a Task (Normal Flow) 
    Given I am logged in as an organizer with id "1"
    When I am on the event page
    And I choose the event with id "1"
    And I choose to delete the task with name "Serve Drinks"
    Then event with id "1" will have no tasks
    And the system shows that my deletion was successful 

Scenario Outline: Delete an Event as a Different Organizer (Error Flow)
    Given I am logged in as an organizer with id "1"
    When I am on the event page
    And I choose the event with id "2"
    And I choose to delete the task with name "Collect Trash"
    Then event with id "1" will still have task "Collect Trash"
    And the system will display error message "Organizer did not organize selected event"