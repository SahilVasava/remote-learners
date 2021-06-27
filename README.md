## Features:

- This app will have a twitch bot which will listen for specific commands.
- The bot should log the tasks onto the website.

## Tech stack:

- Nodejs 
- Express
- PostgreSQL
- React (maybe)

## Tasks:

- [x] Create the project repo
- [x] Create the frontend
    - [x] fetch the tasks from backend
    - [x] display tasks in cards
- [x] Create the backend
    - [x] Create a twitch bot
        - [x] Listen for twitch commands
        - [x] It should log the tasks to database 
    - [x] Configure postgresql as a db
        - [x] use sequelize
    - [x] create the database model
        - [x] create a separate user table
    - [x] create a route to fetch all tasks

## Bot commands:
/remote

/remote task learn python
/remote show
/remote done id
/remote undone id