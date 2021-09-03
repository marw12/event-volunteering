# Jeremy Chow ID 034

Feature: View Personal Schedule

As an owner of an event, I would like to be able to add a note to my event
so that users registered for the event can stay informed about the event

Scenario: Create Event Note (Normal Flow)

    Given I am registered as a user Organizer
    And I am the owner of the event <event>
    When I request to add a note <note> to the event <event>
    Then users registered for the event can see the note <note> on event <event>

    Examples:
        |event 	 |note	    |
        |Christmas Ball |Wear formal attire	|

Scenario: Create Event Note as Volunteer (Alternate Flow)

    Given I am registered as a user Volunteer
    And I am the owner of the event <event>
    When I request to add a note <note> to the event <event>
    Then users registered for the event can see the note <note> on event <event>

    Examples:
        |event 	 |note	    |
        |Christmas Ball |Wear formal attire	|

Scenario: Create Event Note without being the Event Owner (Error Flow)

    Given I am registered as a user Organizer
    And I am not the owner of the event <event>
    When I request to add a note <note> to the event <event>
    Then the system does not allow me to add the note

    Examples:
        |event 	 |note	    |
        |Christmas Ball |Wear formal attire	|
