# Valhalla Chat

## Description
Real time chat application to allow fellow warriors to stay in touch!

## Tech Stack
- **Client:** Typescript, React, Redux, Jest
- **Server:** Typescript, Node, Epxress JS, MongoDB (Mongoose), SocketIO, Jest

## Features
- User Registration / Login
- JWT Authentication
- Real time chat application
- Message history is stored
- Display online / offline members


## Development Setup
- In the root run `yarn`
- Once packages installed
- `yarn client:dev`
- `yarn server:dev`
- Open `localhost:8080` in the browser


## Heroku

### Initial Setup

#### Procfile
- This will have the file to run once built to start the application

#### Create Heroku App
- In CLI run `heroku login` to login
- Then `heroku create node-react-valhalla-chat`
- To start deployment `git push heroku master`