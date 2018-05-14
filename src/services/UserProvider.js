import _ from 'lodash';
import PasswordService from 'services/PasswordService';
import UserModel from '../models/user';
import config from '../config';

const createUserProvider = ({ config }) => ({
  findUser(params) {
    return new Promise((resolve, reject) => {
      UserModel.findOne(params, (error, user) => {
        if (error) {
          reject({ code: 500, error });
        }
        if (!user) {
          reject({ code: 404, error: { message: config.errors.authentication.wrongUser } });
        }
        resolve(user);
      });
    });
  },
  verifyUser(username, password) {
    return this.findUser({ username })
      .then(user => {
        if (PasswordService.verify(password, user.password)) {
          return Promise.resolve(_.pick(user, ['username', 'name', 'role']));
        }
        return Promise.reject({ code: 401, message: config.errors.authentication.wrongPassword });
      }, error => {
        return Promise.reject(error);
      });
  },
});

export default createUserProvider({ config });

