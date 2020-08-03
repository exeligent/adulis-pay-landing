const Validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = function subValidation(data) {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "email is invalid";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "email  field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
