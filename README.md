# Hogwarts Express

A train scheduling app using Firebase to add in and display database information

## Description

[Hogwarts Express](https://xandromus.github.io/hogwarts-express/public/index.html)

![Hogwarts Express](https://xandromus.github.io/responsive-portfolio/assets/images/train.png)

A Harry Potter-themed train scheduler using the Firebase database. Users can enter new train information into the schedule, including:

- the train name
- its destination
- the train's first departure time (in military time)
- the frequency at which the train leaves

This information is pushed into the Firebase database, then accessed from the database to render each train's information to the schedule at the top of the page. Each train is accessed from the database using a snapshot and immediately added to the html table. Using the train's first departure time and its frequency, the following 2 values are calculated:

- next train arrival time (AM/PM)
- minutes away from arrival

These 2 values are added to the html table at the same time as the other values. A remove button is also added so that the user may remove a train from the table (and from the Firebase database).

## Concepts Used

Utilizing the Firebase real time web database, this app uses 3 of the 4 basic functions of persistent storage (CRUD):

- Create -- create and add information to the database
- Read -- read this information and render it to html
- Delete -- remove the information from the database

See below for information regarding updating database information.

## Areas for Future Development

The information for 'Next Arrival' and 'Minutes Away' updates with a page refresh, but this information does not automatically update every minute without the refresh. There is also currently no way for the user to change the train information on the front end after it has been entered. Both of these areas would be integrated in future development on this project.

## Built With

- Sublime Text - Text Editor
- Git Bash
- Firebase

## Authors

- **Xander Rapstine** - [Xander Rapstine](https://github.com/Xandromus)