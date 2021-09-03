# Benjamin Emiliani 260871228
Feature: volunteer Deletes their Account

  As a volunteer, I would like to delete my account so it is no longer in the system.

Background:
    Given a volunteer with first name <firstname> lastname <lastname> in the system
    And a volunteer with first name "Another" lastname "Volunteer" in the system

    Examples:
        | firstname | lastname |
        |   John    | Smith    |
        |   Jim     | Doe      |
        |  Scott    | Paul     |

    And I am logged in as a volunteer with first name <firstname> lastname <lastname>

Scenario Outline: Delete Account (Normal Flow)
    When I choose Delete my Account
    Then I am logged out of the system
    And the system no longer contains a volunteer with first name <firstname> lastname <lastname>

Scenario Outline: Delete Another Volunteer's Account(Error Flow)
    When I attempt to delete account with first name "Another" lastname "Volunteer"
    Then the systems notifies the invalid action
    And the system will contain volunteer with first name "Another" lastname "Volunteer"
