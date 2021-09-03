# ECSE428 Group Project Winter 2021
![Maintained][maintained-badge]
[![Travis Build Status][build-badge]][build]

Group 3 - Jellyfish

## Install Angular CLI

run `npm install -g @angular/cli`

On mac you might have to run `sudo npm install -g @angular/cli`

## Getting Started
After installing the angular cli, clone the project.
Intall the dependecies with command `npm install`

## Run the Application Locally
`ng serve --open`

## Run all end-to-end Gherkin tests
`ng e2e`

## Creating New Components
In terminal or command line prompt open the project user_path/ECSE428/volunteer-app

Run the command `ng generate component name-of-component` to generate the html, css, and typescript files for
new component

## Team Members
- Benjamin Emiliani, 260871228  benjamin.emiliani@mail.mcgill.ca
- Sami Hilal, 260868458, sami.hilal@mail.mcgill.ca
- Matteo Barbieri, 260805184, matteo.barbieri@mail.mcgill.ca
- Matthew Langshur, 260704964, matthew.langshur@mail.mcgill.ca
- Jeremy Chow, 260869534, jeremy.chow@mail.mcgill.ca
- Ragheed Qasmieh, 260780556, ragheed.qasmieh@mail.mcgill.ca
- Marwan Khan, 260762251, marwan.khan@mail.mcgill.ca
- Marie Vu, 260807903, marie.vu@mail.mcgill.ca
- Helen Lin, 260715521, helen.m.lin@mail.mcgill.ca
- Arianit Vavla, 260868601, arianit.vavla@mail.mcgill.ca
- Nicolas Bieber, 260786401, nicolas.bieber@mail.mcgill.ca

## Project Description
Our project is to develop a web application for hosting and participating in volunteering events. The app will allow users or organizations to signup and create volunteer events with specific information. The app will keep a record of these events along with each registered volunteer.

We will implement the front-end of our web application using Angular and Firebase for database management.

## Build and Continuous Integration
As we are using Firebase for our web application’s backend database, we do not need a separate build tool such as Maven or Gradle. For continuous integration we will use Travis CI.

## Automated Unit and Story Testing
We will be using Cucumber.js to execute Gherkin story tests for our backend. Our story tests are associated with project backlog items and available within our /story-tests directory.


Note: This ReadMe will be updated accordingly as our project progresses.



[maintained-badge]: https://img.shields.io/badge/maintained-yes-brightgreen
[build-badge]: https://travis-ci.org/BenjaminEmiliani/ECSE428.svg?branch=dev
[build]: https://travis-ci.org/BenjaminEmiliani/ECSE428
