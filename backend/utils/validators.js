const PASSWORD_FORMAT_REGEX = /^[\w]{6,32}/i

const validPassword = (password) => {
  return typeof password === 'string' &&
    PASSWORD_FORMAT_REGEX.test(password)
}


module.exports = { validPassword };
