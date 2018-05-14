import jwt from 'jsonwebtoken';
import config from '../config';

export const createAuthService = ({ config }) => ({
  /**
   * Verifies token and returns it's payload
   * @param {string} JWT - json web token
   * @return {Promise}<payload>
   */
  verifyJWT(JWT) {
    return new Promise((resolve, reject) => {
      jwt.verify(JWT,
        config.JWTSecret,
        {
          issuer: config.issuer,
          audience: config.audience,
        },
        (error, decoded) => {
          if (error) {
            return reject({ code: 500, error: error.message, name: error.name });
          }
          resolve(decoded);
        }
      );
    });
  },

  /**
   * Generates token with given payload
   * @param {object} payload - payload to put in the JWT
   * @return {Promise}<token>
   */
  generateJWT(payload) {
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        config.JWTSecret,
        {
          issuer: config.issuer,
          audience: config.audience,
          expiresIn: config.tokenExpiration,
        },
        (error, token) => {
          if (error) {
            return reject({ code: 500, error: error.message, name: error.name });
          }
          resolve({ token, payload });
        }
      );
    });
  },
});

export default createAuthService({ config: config.authentication });
