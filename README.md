# Pwoli with Express.js Sample Application

A sample Express.js app which uses Pwoli to show users how it works

## Try it out

Easiest way is to clone this repo into your local:

```
git clone https://github.com/internetmango/pwoli-express-sample.git
# cd into the directory
npm install
```

- Provide your DB credentials in the file config/config.json

- Initialize the DB with tables

```
node --experimental-json-modules dbinit.mjs
```
- For adding some seed data(dummy data) to the tables, please run:

```
sequelize db:seed:all
```
- Run the app
```
npm start
```

Point your browser to http://localhost:4000/items/list and you should see a page with a `GridView` where you can do CRUD operations for the items.

Point your browser to http://localhost:4000/items/api to see the RESTful API features mentioned in https://internetmango.github.io/pwoli/rest-api
