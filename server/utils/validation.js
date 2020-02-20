/**
 * @desc REQUEST SCHEMA
 */
export default {
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
