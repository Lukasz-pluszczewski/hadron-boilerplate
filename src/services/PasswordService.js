import passwordHash from 'password-hash';
import config from '../config';

const createPasswordService = ({ config }) => ({
  options: {
    algorithm: config.passwordsHashing.algorithm,
    saltLength: config.passwordsHashing.saltLength,
  },

  /**
   * Gets non hashed password and returns it's hash
   * @param {string} password
   * @return {string} hashed password
   */
  hash(password) {
    return passwordHash.generate(password, this.options);
  },

  /**
   * Verifies if password matches hashedPassword
   * @param {string} password
   * @param {string} hashedPassword
   * @return {boolean} isMatching
   */
  verify(password, hashedPassword) {
    return passwordHash.verify(password, hashedPassword);
  },

  /**
   * Verifies if password is already hashed
   * @param {string} password
   * @return {boolean} isHashed
   */
  isHashed(password) {
    return passwordHash.isHashed(password);
  },
});

export default createPasswordService({ config });
