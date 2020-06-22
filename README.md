# Test task. Calendar app on MERN stack.

### Node.js version ^12.18.1, npm ^6.14.4

Please, be sure you're using suitable version of node.js and npm

## Getting started

```bash
npm run setup // it will install all dependencies in parallel
npm run prod // it will build client and start node.js backend with serving static files
# or you can install dependencies by yourself
cd client && npm install // install client dependencies
cd server && npm install // install server dependencies
```

## Getting started server

### API Documentation https://documenter.getpostman.com/view/10695911/SzzoYv8N

You should create .env file in the server folder
Example of .env

```conf
POST=8080
DB_PWD=your db password
DB_USER=your db user
DB_HOST=your db host
DB_NAME=your db name
JWT_SECRET=some password for jwt

```

Commands for running (available in server folder)

```bash
npm run start // run server with nodemon
npm run start:debug // run server with nodemon in debug mode
npm run lint // run linter across the whole server src
npm run seed // seed db with predefined users
```

After seeding DB you can login with credentials

```
peppa@gmail.com
password
# or
george@gmail.com
password
```

## About

In events I especially departed from task, for better look.
In my case schedule have only one column, and it better looks with full width events.

Also function for calculating events conflicts and positions turned out very tricky so i've added some tests for it.  
I haven't found solution with less complexity, but under current circumstances it seems okay.
Typically we don't have huge amount of events per day.

### P.S.

I'm trying to continue growing as a professional every day. So I would be really thankful for your feedback about this project.
It'll help me become better!
