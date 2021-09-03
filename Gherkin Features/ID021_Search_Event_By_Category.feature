Feature: Search event by category

  As a user, I want to be able to search for an event by it's category

  Background:
    Given a Volunteer account named "JeremyVolunteer"
    And an Organizer account named "JeremyOrganizer"

  # Normal flow
  Scenario Outline: Search for event by category as a Volunteer
    Given I am logged in as a Volunteer
    And the system contains registered events with category <category>
    When I search for an event by category <category>
    Then the system should only display events with the category <category>

    Examples:
      | category |
      | Charity  |
      | Leisure  |
      | Sport    |

  # Alternate flow
  Scenario Outline: Search for event by category as an Organizer
    Given I am logged in as an Organizer
    And the system contains registered events with category <category>
    When I search for an event by category <category>
    Then the system should only display events with the category <category>

    Examples:
      | category |
      | Charity  |
      | Leisure  |
      | Sport    |

  # Alternate flow
  Scenario: Search for event that does not exist by category
    Given I am logged in as a Volunteer
    And the system does not contain any events
    When I search for an event by category "Charity"
    Then the system should not display any events

  # Error flow
  Scenario: Search for event by category without providing a category
    Given I am logged in as a Volunteer
    And the system contains registered events with category "Charity"
    When I search for an event by category without providing a category
    Then the system should prompt the user to provide a valid category

  # Error flow
  Scenario: Search for event by category when not logged in
    Given I am not logged in
    When I search for an event by category "Charity"
    Then the system should prompt the user to log in
