module.exports = Object.freeze({
  USER_NAME_MIN_LENGTH: 2,
  USER_NAME_MAX_LENGTH: 35,
  USER_LAST_NAME_MIN_LENGTH: 1,
  USER_LAST_NAME_MAX_LENGTH: 35,
  PASSWORD_MIN_LENGTH: 6,
  PASSWORD_MAX_LENGTH: 32,

  EMAIL_PATTERN: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  NAME_PATTERN: /^(?!.*__.*)(?!.*\.\..*)[a-zа-я0-9_.]{2,35}$/iu,
  PASSWORD_PATTERN: /^(?!.*__.*)(?!.*\.\..*)[a-z0-9_.]{6,32}$/iu,
});
