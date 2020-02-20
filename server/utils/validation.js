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
  },
  product: {
    formType: 'create_product',
    a: { field: 'item', required: true, isName: true },
    b: { field: 'description', required: true },
    c: { field: 'category', required: true, isName: true },
    d: { field: 'productImage', required: true },
  },
  edit: {
    formType: 'edit_product',
    a: { field: 'item', isName: true },
    b: { field: 'description', isName: true },
    c: { field: 'category', isName: true },
    d: { field: 'productImage' },
  },
};
