/**
 * @desc REQUEST SCHEMA
 */
export default {
  login: {
    formType: 'authenticate',
    a: { field: 'email', required: true },
    b: { field: 'password', required: true }
  },
  onboard: {
    formType: 'onboard',
    a: { field: 'firstName', required: true, isName: true },
    b: { field: 'lastName', required: true, isName: true },
    c: { field: 'email', required: true, isEmail: true },
    h: { field: 'userName', required: true, isName: true },
    k: {
      field: 'password', required: true, min: 8, max: 15
    }
  }
};
