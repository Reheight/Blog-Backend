const expressions = {
  email: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
  name: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
  username: /^([a-zA-Z0-9-._]){4,16}/,
  password: /^(?=.{2,}[a-z])(?=.{2,}[A-Z])(?=.{2,}\d)(?=.*[#$#@%&*?])[A-Za-z\d#$#@%&*?]{8,}$/,
};

/**
 *
 * @param {Date} birthdate
 */
const getAge = (birthdate) => {
  const now = new Date();
  const age = now.getFullYear() - birthdate.getFullYear();
  const month = now.getMonth() - birthdate.getMonth();
  const day = now.getDate() - birthdate.getDate();
  if (month < 0 || (month < 0 && day < 0)) {
    age--;
  }

  return age;
};

const validateCredentials = (username, password, firstName, lastName, email) =>
  expressions["email"].test(email) &&
  expressions["name"].test(firstName) &&
  expressions["name"].test(lastName) &&
  expressions["password"].test(password) &&
  expressions["username"].test(username);

module.exports = {
  validateCredentials,
  getAge,
};
