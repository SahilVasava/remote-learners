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
- [] sign up for twitch dev account , get api credentials
- [] Create the frontend
- [] Create the backend
    - [x] Create a twitch bot
        - [x] Listen for twitch commands
        - [x] It should log the tasks to database 
    - [] Create auth functionality
    - [x] Configure postgresql as a db
        - [x] use sequelize
    - [x] create the database model
        - [x] create a separate user table

## Bot commands:
/remote

/remote task learn python
/remote show
/remote done id
/remote undone id