const Validator = require("validator");
//load input validation
const isEmpty = require("./is-empty");
module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "handle needs to be between 2 and 40 characters";
  }
  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Handle is required";
  }
  if (Validator.isEmpty(data.status)) {
    errors.status = "Status Field is required";
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "not a valid url";
    }
  }
  if (!isEmpty(data.github)) {
    if (!Validator.isURL(data.github)) {
      errors.github = "not a valid github url";
    }
  }
  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "not a valid youtube url";
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "not a valid twitter url";
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "not a valid facebook url";
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "not a valid instagram url";
    }
  }
  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "not a valid linkedin url";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
