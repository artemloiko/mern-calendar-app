const bcrypt = require('bcryptjs');
const config = require('./config');
const db = require('./models');

const users = [
  {
    username: 'Peppa',
    email: 'peppa@gmail.com',
    password: bcrypt.hashSync('password', 8),
    events: [
      { start: 0, duration: 15, title: 'Exercies' },
      { start: 25, duration: 30, title: 'Travel to work' },
      { start: 30, duration: 30, title: 'Plan day' },
      { start: 60, duration: 15, title: "Review yesterday's commits" },
      { start: 100, duration: 15, title: 'Code review' },
      { start: 180, duration: 90, title: 'Have lunch with John' },
      { start: 360, duration: 30, title: 'Skype call' },
      { start: 370, duration: 45, title: 'Follow up with designer' },
      { start: 405, duration: 30, title: 'Push up branch' },
    ],
  },
  {
    username: 'George',
    email: 'george@gmail.com',
    password: bcrypt.hashSync('password', 8),
    events: [
      { start: 0, duration: 540, title: 'Watching TV series' },
      { start: 0, duration: 120, title: 'Have a breakfast' },
      { start: 140, duration: 140, title: 'Have a lunch' },
      {
        start: 300,
        duration: 15,
        title: 'Do something that requires a really long text like that',
      },
      { start: 400, duration: 140, title: 'Have an evening' },
    ],
  },
];

async function seed() {
  await db.init();
  await db.connection.dropCollection(config.dbName);
  console.log('Successfully dropped collection');
  const result = await db.User.insertMany(users);
  console.log('Successfully added', result.insertedCount, 'users');
  process.exit(0);
}

seed();
