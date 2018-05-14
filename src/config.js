const config = {
  port: 8080 || process.env.PORT,
  bodyLimit: '100kb',
  corsHeaders: ['Link', 'Jwt'],
  authentication: {
    JWTSecret: 'thisIsNotSoSecretChangeIt',
    issuer: 'Bardziej.pro',
    audience: 'Bardziej.pro',
    tokenExpiration: 86400,
    algorithms: ['HS256'],
    authHeader: 'jwt',
  },
  passwordsHashing: {
    algorithm: 'sha1',
    saltLength: 8,
  },
  db: {
    dbName: 'changeThisToYourDbName',
  },
  errors: {
    notFound: 'Not found',
    authentication: {
      noAuthHeader: 'Authentication header not provided',
      unauthenticated: 'User not found',
      wrongUser: 'Wrong user and password',
      wrongPassword: 'Wrong password',
    },
  },
};

export default config;
