import config from '../src/config';
import db from '../src/db';
import Users from '../src/models/user';

const usersFixtures = [
  {
    id: '58b97d8c442550055c5c82f4',
    username: 'admin',
    password: 'sha1$3fce7d63$1$f56c93f7a5d002ce95c7a4de129ae1ef56fd7d53', // admin123
    name: 'Admin',
    role: 'admin'
  },
  {
    id: '58b97d99442550055c5c82f5',
    username: 'user',
    password: 'sha1$c214600e$1$feb7cb91d56349f893f0832401fba6a4c9c2844e', // 123
    name: 'User',
    role: 'user'
  },
];

db(config, () => {
  Users.create(usersFixtures, (err) => {
    if(err) {
      console.log('Creating fixtures failed with error: ', err);
      return process.exit(1);
    }
    console.log('Fixtures created correctly you can safely kill nodemon process');
    process.exit();
  });
});
