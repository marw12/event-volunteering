# Backlog Item ID002 | ECSE 428 Group 3 | Created by Helen Lin, 260715521

Feature: Create account for organizer (ID002)
As an event organizer, I want to be able to create an account with my McGill email,
so that I can start creating, organizing, and tracking events.

  Scenario Outline: (Normal flow) Create a new organizer account with valid email, password, and name, and provide extra user profile details.
    Given the system does not contain an account associated with <email>
     When I choose to create a new organizer account
      And I provide a valid email <email>
      And I provide a valid password
      And I provide a first name
      And I provide a last name
      And I provide other profile information
     Then a new organizer account is created
      And the system indicates that the organizer account has been successfully created
      And an email is sent to <email> 

    Examples: 
      | email                         |
      | helen.m.lin@mail.mcgill.ca    |
      | helenthesunflower@gmail.com   |
      | helenthesunflower@outlook.com |

  Scenario Outline: (Alternate flow) Create a new organizer account with valid email, password, name, and no user profile details.
    Given the system does not contain an account associated with <email>
     When I choose to create a new organizer account
      And I provide a valid email <email>
      And I provide a valid password
      And I provide a first name
      And I provide a last name
      And I provide no other profile information
     Then a new organizer account is created
      And the system indicates that the organizer account has been successfully created
      And an email is sent to <email> 

    Examples: 
      | email                         |
      | helen.m.lin@mail.mcgill.ca    |
      | helenthesunflower@gmail.com   |
      | helenthesunflower@outlook.com |

  Scenario Outline: (Error flow) Create a new organizer account with an email that already exists in the system.
    Given the system already contains an account associated with <email>
     When I choose to create a new organizer account
      And I provide a valid email <email>
      And I provide a valid password
      And I provide a first name
      And I provide a last name
     Then a new organizer account is not created
      And the system warns me that the email is already associated to an account in the system
      And the system asks if I want a password reset link sent to <email>

    Examples: 
      | email                         |
      | helen.m.lin@mail.mcgill.ca    |
      | helenthesunflower@gmail.com   |
      | helenthesunflower@outlook.com |

  Scenario Outline: (Error flow) Create a new organizer account with invalid email.
    Given the system does not contain an account associated with <email>
     When I choose to create a new organizer account
      And I provide an invalid email <email>
      And I provide a valid password
      And I provide a first name
      And I provide a last name
      And I provide other profile information
     Then a new organizer account is not created
      And the system warns me that the email provided is invalid

    Examples: 
      | email                         |
      | test       |
      | ""         |
      | abc@mcgill |


  Scenario Outline: (Error flow) Create a new organizer account with invalid password.
    Given the system does not contain an account associated with <email>
     When I choose to create a new organizer account
      And I provide a valid email <email>
      And I provide an invalid password
      And I provide a first name
      And I provide a last name
     Then a new organizer account is not created
      And the system warns me that the provided password is invalid

    Examples: 
      | email                         |
      | helen.m.lin@mail.mcgill.ca    |
      | helenthesunflower@gmail.com   |
      | helenthesunflower@outlook.com |

  Scenario Outline: (Error flow) Create a new organizer account with invalid (empty) first name.
    Given the system does not contain an account associated with <email>
     When I choose to create a new organizer account
      And I provide a valid email <email>
      And I provide a valid password
      And I provide no first name
      And I provide a last name
     Then a new organizer account is not created
      And the system warns me that I need to provide a first name

    Examples: 
      | email                         |
      | helen.m.lin@mail.mcgill.ca    |
      | helenthesunflower@gmail.com   |
      | helenthesunflower@outlook.com |

  Scenario Outline: (Error flow) Create a new organizer account with invalid (empty) last name.
    Given the system does not contain an account associated with <email>
     When I choose to create a new organizer account
      And I provide a valid email <email>
      And I provide a valid password
      And I provide a first name
      And I provide no last name
     Then a new organizer account is not created
      And the system warns me that I need to provide a last name
    
    Examples: 
      | email                         |
      | helen.m.lin@mail.mcgill.ca    |
      | helenthesunflower@gmail.com   |
      | helenthesunflower@outlook.com |