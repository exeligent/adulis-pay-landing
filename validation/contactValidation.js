const Validator = require("validator");
const isEmpty = require("./is-empty");

// name, email, phone, comment
module.exports = function validateContactInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.comment = !isEmpty(data.comment) ? data.comment : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "name is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "email field is required";
  }
  if (Validator.isEmpty(data.comment)) {
    errors.comment = "comment field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
