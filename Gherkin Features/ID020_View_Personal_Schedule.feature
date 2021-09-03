# Matteo Barbieri feature ID020

Feature: View Personal Schedule

As a User, I would like to view my personal schedule
so that I can see the events I will be participating in

Scenario: View Schedule Volunteer (Normal Flow)

    Given I am registered as a user Volunteer
    And I am registered for the event <event> scheduled at <time>
    When I request to view my schedule
    Then the system shows the events I am registered from

    Examples:
        |event	    |startTime		        |   
        |FoodDrive	|2021-03-22-19-30-00	|

Scenario: View Schedule Organizer (Alternate Flow)

    Given I am registered as an Organizer
    And I am organizing the event <event> scheduled at <time>
    When I request to view my schedule
    Then the system shos the events I am organizing

    Examples:
        |event	    |startTime		        |   
        |FoodDrive	|2021-03-22-19-30-00	|

Scenario: View Schedule no events (Error Flow)

    Given I am registered as a Volunteer
      And I am not registered for any events
     When I request to view my schedule
     Then the system shows the error 'you must register for a an event to view schedule'
