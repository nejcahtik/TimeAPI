# TimeAPI

## Installation Requirements

- Angular CLI
- Angular
- npm
- node.js

## Installation Process

Download the code and go to the downloaded folder. Open the Command Prompt and type:
`ng serve --open`
to open the app.


To bypass the CORS policy error, the app does not communicate directly with the TimeAPI server. It sends the data to a local server which then fetches the data from the TimeAPI server and sends it back to the app. In order to install this local server, go to the folder:
`./server/`
and type:
`npm install` 
into the command line.
To run the server, type:
`node index.js`


If the CORS policy is changed on the TimeAPI server, the local server is not needed anymore as the app can communicate directly with the TimeAPI server. In this case, the code in the app should be changed a little: 
- open `./src/app/user.service.ts` file and comment/uncomment the code as instructed in the file
- open `./src/app/users/users.component.ts` file and change two lines of the code as instructed in the file
- open `./src/app/presentUsers/presence.component.ts` file and change one line of the code as instructed in the file


## User Guide

When the app is opened, one should go to the /Settings component in order to set the token. After the token is set, the /All Employees or /Presence component can be opened.
- After opening /All Employees component, if the token is correct, the IDs, first names, last names and emails of all the employees should be fetched from the server and displayed in the table below. The search bar can be used to search among all employees.
In order to add new employee, at least the first and last name of the new employee should be given, or else the app displays an error. After clicking the button "Add New Employee", new employee is created, added into the database and displayed in the table below.

- When opening /Presence component, if the token is set correctly, the IDs, first names, last names and emails of currently present employees are fetched from the server and displayed in the table below. The button "Refresh" can be used to update the list.

