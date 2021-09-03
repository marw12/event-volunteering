Feature: Search event by date

  As a user, I want to be able to search for an event by it's date

  Background:
    Given a Volunteer account named "SamiVolunteer"
    And an Organizer account named "SamiOrganizer"

  # Normal flow
  Scenario Outline: Search for event by date as a Volunteer
    Given I am logged in as a Volunteer
    And the system contains registered events with date <date>
    When I search for an event by date <date>
    Then the system should only display events with the date <date>

    Examples:
      | date	  |
      | 2021-02-11|
      | 2021-03-15|
      | 2021-03-16|

  # Alternate flow
  Scenario Outline: Search for event by date as an Organizer
    Given I am logged in as an Organizer
    And the system contains registered events with date <date>
    When I search for an event by date <date>
    Then the system should only display events with the date <date>

    Examples:
      | date	  |
      | 2021-02-11|
      | 2021-03-15|
      | 2021-03-16|

  # Alternate flow
  Scenario: Search for event that does not exist by date
    Given I am logged in as a Volunteer
    And the system does not contain any events
    When I search for an event by date "2021-03-14"
    Then the system should not display any events

  # Error flow
  Scenario: Search for event by date without providing a date
    Given I am logged in as a Volunteer
    And the system contains registered events with date "2021-03-14"
    When I search for an event by date without providing a date
    Then the system should prompt the user to provide a valid date