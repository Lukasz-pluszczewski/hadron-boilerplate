import config from '../src/config';

const user = {
  username: 'user',
  name: 'User',
  role: 'user',
};

import { createAuthService } from '../src/services/AuthService';

createAuthService({ config: {
  ...config.authentication,
  tokenExpiration: 604800, // 1 week
} }).generateJWT({ user }).then(newToken => {
  console.log('Generated token for user', user);
  console.log(newToken);

  process.exit();
});
