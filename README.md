# FancyCalendar

The goal of the application is to have a calendar to manage users meetings.

##Education purpose app
A meeting must contain - start/end hours, name, meeting room. The calendar must be populated from the attached JSON file.
 
#### Front End task
For the current implementation we ask you to create the calendar's view and skip user authentication and any kind of session management.
 - Create a calendar view with one month per screen. 
 - Navigation through all months is also desired. 
 - You should not use any of the existing calendar API's. 
 - Each day should be represented by a cell large enough to **contain at least 3 of the meetings** for the day. 
 - When a cell is selected all the meetings should be displayed in a pop-up window. 
 - All meetings should be arranged by their starting time.
 - Two meetings can't be placed in the same room at the same time.
 
Please focus on the visuals, it is important to be responsive without the use of Bootstrap to demonstrate CSS skills.
Use the following JSON to get the data from

## Local application start 
- Run `npm run start:server` to start the json serve with default settings.
- Run `npm run start:calendar` to serve the calendar app locally.

## Design
As a design insiration and ideas is used the 
[fullcalendar](https://fullcalendar.io/demos)
demo project
[Full Calendar](https://demos.creative-tim.com/fullcalendar/fullcalendar.html?_ga=2.16838073.1265336677.1615199619-822555436.1615199619)

## Technologies
- [Angular](https://angular.io)
  - Main front-end framework
- [Nx](https://nx.dev)
  - This project was generated using
- [json-server](https://github.com/typicode/json-server)
  - The mock backend is provided by json-server

