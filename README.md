# hallowatcher's Vue.js + NestJS starter

Welcome to hallowatcher's vue starter kit.

### Features
- osu! OAuth already set up
- Backend and frontend linked, production ready
- Sequelize ORM
- Vue 2 with Vuetify pre-setup
- A full starter website template for you to change anything you need

### Developing
- To start the project, you need to run an instance of MariaDB and redis. You also need Node.js 12+ installed.
- Clone this project, cd into it and install dependencies: `yarn`
- Copy the `.env.example` file and name it `.env`. Fill out your MariaDB, redis and osu! OAuth details.
- Session key can be any random string.
- Start the project with `yarn dev`. If there are config errors, you will be notified of them on the console.

### About osu! oauth setup
Create an osu! oauth client on the osu settings page. Make sure to set the redirect URL to `http://localhost:4200/api/auth/callback`
