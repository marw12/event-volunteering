#UPDATED FEATURE FOR SPRINT 1: Feb 12, 2021

Feature: Register a volunteer to an event
  As a volunteer, I would like to register to an existing event 
  so that I can participate in it.

  Scenario Outline: Volunteer registers for a valid event (Normal Flow)
    Given I am a volunteer with <firstName> <lastName> and registered in the system
  	  And there exists a valid event with <eventName> in the system
     When I am on the event registration page
      And I choose to register for the event <eventName>
     Then I will be in the list of participants for event <eventName>
      And the system shows that my registration was successful

	 Examples: 
      | firstName | lastName | eventName    |
      | Harry     | Potter   | Tournament   | 
      | Wanda     | Maximoff | Westview     |
      | Jane      | Doe      | SoupKitchen  |
      | Jimmy     | Woo      | MagicShow    |
  
  Scenario Outline: Volunteer registers for an event that they are already registered for (Alternate Flow)
   Given I am a volunteer with <firstName> <lastName> and registered in the system
  	 And there exists a valid event with <eventName> in the system
     And I am already registered for the event <eventName>
    When I am on the event registration page
     And I choose to register for the event <eventName>
    Then I will be in the list of participants for event <eventName>
     And the system shows that I was already registered for the event

	 Examples: 
      | firstName | lastName | eventName    |
      | Billie    | Eilish   | concert      | 
      | Patrick   | Star     | GloveWorld   |
      | Carly     | Kloss    | FashionWeek  |
      | Charles   | Xavier   | schooltrip   |

  Scenario Outline: Volunteer does not provide event selection (Error Flow)
   Given I am a volunteer with <firstName> <lastName> and registered in the system
  	 And there exists a valid event with <eventName> in the system
    When I am on the event registration page
     And I choose to register for an event without providing the <eventName>
    Then the system indicates that I must select an event

	 Examples: 
      | firstName | lastName | eventName    |
      | Jamie     | Oliver   | fooddrive    | 
      | Poison    | Ivy      | gardening    |
      | Bruce     | Banner   | ScienceFair  |