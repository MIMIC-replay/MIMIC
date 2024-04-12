const USER_FORMAT_REGEX = /^[\w]{6,32}/i;
const PASSWORD_FORMAT_REGEX = /^[\w]{6,32}/i;

const isValidUser = (user) => typeof user === 'string'
    && USER_FORMAT_REGEX.test(user);

const isValidPassword = (password) => typeof password === 'string'
    && PASSWORD_FORMAT_REGEX.test(password);

module.exports = { isValidUser, isValidPassword };
