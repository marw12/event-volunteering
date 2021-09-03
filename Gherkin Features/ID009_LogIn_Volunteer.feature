Feature: Log in as a volunteer (ID009)

    As a volunteer, I would like to log into the application using my email or username, and password

    #NORMAL FLOW
    Scenario: Log in with username
        Given a username has an account
        When its username is user123
        And the password is password123
        Then logged in successfully

    #ALTERNATE FLOW
    Scenario: Log in with email
        Given an email has an account
        When its email is "name@gmail.com"
        And the password is password123
        Then logged in successfully

    #ERROR FLOW
    Scenario: Incorrect password
        Given a username has an account
        When its username is user123
        And the password entered is password12  #incorrect password, should be password123
        Then incorrect password
        And invalid password message

    #ERROR FLOW
    Scenario: Username doesn't exist
        Given a username has an account
        When username written is user12         #username doesn't exist is user123
        And the password is password123
        Then username does not exist
        And invalid username message