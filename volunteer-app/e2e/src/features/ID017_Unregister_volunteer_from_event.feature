Feature: Volunteer unregisters from event
  As a Volunteer, I want to be able to unregister from an event
  so that I would be able to change my plans.

  Background:
    Given I am logged in as a Volunteer

  Scenario: Unregister volunteer from event (Normal Flow)
    When I select myself for registration
    When I select Christmas Ball for registration
    When I request to unregister the event
    Then I wont be registered to the event

  Scenario: Attempt to unregister from event without selecting one (Error Flow)
    When I request to unregister without selecting an event
    Then an error message is issued