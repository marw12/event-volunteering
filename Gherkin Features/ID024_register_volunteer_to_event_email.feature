# Helen Lin 260715521 - Groomed story for Sprint 4

Feature: Email volunteer after registering for event (ID024)
  As a volunteer, I would like to receive an email confirmation after I register to an event, 
  so that I have a confirmation record and link to update or cancel my registration.

  Scenario Outline: Email confirmation to volunteer with no other events (Normal Flow)
    Given I am a volunteer with <firstName> <lastName> and registered in the system with <email>
  	  And there exists a valid event with <eventName> in the system
     When I am on the event registration page
      And I choose to register for the event <eventName>
     Then I will be in the list of participants for event <eventName>
      And the system will send an email to <email> with the event details for <eventName>

	 Examples: 
      | firstName | lastName | email                     | eventName    |
      | Harry     | Potter   | hp1990@hogwarts.com       | Tournament   | 
      | Wanda     | Maximoff | scarletwitch@avengers.com | Westview     |
      | Jane      | Doe      | jd@gmail.com              | SoupKitchen  |
      | Jimmy     | Woo      | jimmy_woo@outlook.com     | MagicShow    |
  
  Scenario Outline: Email confirmation to volunteer with other event registrations (Alternate Flow)
   Given I am a volunteer with <firstName> <lastName> and registered in the system with <email>
  	 And there exists a valid event with <eventName> in the system
     And I am already registered to volunteer for other distinct events
    When I am on the event registration page
     And I choose to register for the event <eventName>
    Then I will be in the list of participants for event <eventName>
     And the system will send an email to <email> with the event details for <eventName>
     And the email will also contain a reminder for the other events I am registered for

	 Examples: 
      | firstName | lastName | email                        | eventName    |
      | Billie    | Eilish   | billie@music.com             | concert      | 
      | Patrick   | Star     | thisispatrick@krustykrab.com | GloveWorld   |
      | Carly     | Kloss    | carly@gmail.com              | FashionWeek  |
      | Charles   | Xavier   | professor_x@hotmail.com      | schooltrip   |

  Scenario Outline: Volunteer does not provide event selection (Error Flow)
   Given I am a volunteer with <firstName> <lastName> and registered in the system
  	 And there exists a valid event with <eventName> in the system
     And I am already registered for the event <eventName>
    When I am on the event registration page
     And I choose to register for an event without providing the <eventName>
    Then then I will not be registered for this event
     And I will not receive an email confirmation for <eventName>

	 Examples: 
      | firstName | lastName | email                         | eventName    |
      | Jamie     | Oliver   | topchef@gmail.com             | fooddrive    | 
      | Poison    | Ivy      | greenthumb@dc.com             | gardening    |
      | Bruce     | Banner   | gammaraysarecool@avengers.com | ScienceFair  |