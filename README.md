# Test task. Calendar app on MERN stack.

### Node.js version 12.18.0

## Getting started

```bash
cd client && npm install // install client dependencies
cd server && npm install // install server dependencies
```

## Getting started server

### API Documentation https://documenter.getpostman.com/view/10695911/SzzoYv8N

You should create .env file in folder server
Example of .env

```conf
POST=8080
#TODO add everything here
```

Commands for running

```bash
npm run start // run server with nodemon
npm run start:debug // run server with nodemon in debug mode
npm run lint // run linter across the whole server
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
Normally we don't have huge amount of events per day. I've checked the calculation time with console.time and it seems okay, also I've added useMemo to prevent extra recalculations.
