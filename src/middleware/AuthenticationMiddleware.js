import { errorToRes } from '../helpers/util';
import AuthService from 'services/AuthService';
import UserProvider from 'services/UserProvider';
import config from '../config';

const AuthenticationMiddleware = {

  /**
   * Middleware that blocks request if it is not properly authenticated
   * @param {Request} req
   * @param {Response} res
   * @param {Function} next
   * @return {void}
   */
  authenticate(req, res, next) {
    if (!req.headers[config.authentication.authHeader]) {
      return res.status(401).send({
        message: config.errors.authentication.noAuthHeader,
        details: { expectedHeaderName: config.authentication.authHeader, actualHeaders: req.headers },
      });
    }

    // verifying auth header and sending error response if not correct
    AuthService.verifyJWT(req.headers[config.authentication.authHeader])
      .then(payload => UserProvider.findUser(payload.user))
      .then(user => {
        req.user = user;
        next();
      })
      .catch(error => {
        if (error.code === 404) {
          return res.status(401).send({ message: config.errors.authentication.unauthenticated });
        }
        res.status(error.code).send({ message: error.error });
      });
  },

  /**
   * Middleware that adds authorization routes
   * @param {Router} router
   * @return {Router} router
   */
  authorizationRoutes(router) {
    router.post('/login', (req, res) => {
      if (!req.body.username || !req.body.password) {
        return res.status(400).send({ message: 'Bad request' });
      }

      // verifying if user exists and sending token if so
      UserProvider.verifyUser(req.body.username, req.body.password)
        .then(user => AuthService.generateJWT({ user }))
        .then(data => res.json({ token: data.token, user: data.payload.user }))
        .catch(error => {
          if (error.code === 404) {
            error.code = 401;
            error.message = 'Wrong user and password';
          }
          errorToRes(res)(error);
        });
    });
    router.get('/login', this.authenticate, (req, res) => {
      return AuthService.generateJWT({ user: req.user })
        .then(data => res.json({ token: data.token, user: data.payload.user }))
        .catch(errorToRes(res));
    });
    return router;
  },
};

export default AuthenticationMiddleware;
