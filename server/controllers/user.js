import { Form } from 'form-my-simple-validation';
import Utils from '../utils/helpers';
import formSchema from '../utils/validation';
import { errorResponse, successResponse } from '../utils/response';
import * as Services from '../services';
import db from '../models';

const { User } = db;
/**
 * @class
 */
export default class Users {
  /**
   * @method create
   * @param {object} req The request object
   * @param {object} res The response object
   * @return {*} json
   */
  static async createUserAccount(req, res) {
    try {
      const {
        userName, email, password, firstName, lastName
      } = req.body;

      // validate form fields
      const validationResult = Form.validateFields('onboard', formSchema, req.body);

      if (validationResult.error) {
        return res.status(400).jsend.fail(validationResult);
      }

      // deny duplicate record
      const report = await Services.reportDuplicate(User, { email });

      if (report === 'negative') {
        return res.status(409).jsend.fail(errorResponse('DuplicateError', 400, 'email', 'Create User Account', 'Email already exist', { error: true, operationStatus: 'Processs Terminated!' }));
      }

      // Create customer account
      const data = {
        userName, email, firstName, lastName, password
      };

      const user = await Services.insertToDataBase(User, data);

      const token = Utils.generateToken('8760h', { id: user.id });

      return res.status(201).jsend.success(successResponse('Account created!', 201, 'Create User Account', {
        error: false, operationStatus: 'Operation Successful!', user, token
      }));
    } catch (error) {
      const result = errorResponse(`${error.syscall || error.name || 'ServerError'}`, 500, `${error.path || 'No Field'}`, 'create User', `${error.message}`, { error: true, operationStatus: 'Proccess Terminated!', errorSpec: error });
      return res.status(500).jsend.fail(result);
    }
  }

  /**
   * @method create
   * @param {object} req The request object
   * @param {object} res The response object
   * @return {*} json
   */
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // validate form fields
      const validationResult = Form.validateFields('authenticate', formSchema, req.body);

      if (validationResult.error) {
        return res.status(400).jsend.fail(validationResult);
      }

      const user = await Services.retreiveOneData(User, { email });

      if (!user) {
        return res.status(409).jsend.fail(errorResponse('IdentificatonError', 400, 'email', 'login', 'Email not found exist', { error: true, operationStatus: 'Processs Terminated!' }));
      }

      // confirm password is correct
      const passwordMatch = User.comparePassword(password, user);
      if (!passwordMatch) {
        return res.status(409).jsend.fail(errorResponse('IdentificatonError', 400, 'password', 'login', 'password incorrect', { error: true, operationStatus: 'Processs Terminated!', passwordMatch }));
      }

      const token = Utils.generateToken('8760h', { id: user.id });

      return res.status(200).jsend.success(successResponse('Login Successful', 200, 'login', {
        error: false, operationStatus: 'Operation Successful!', user, token
      }));
    } catch (error) {
      const result = errorResponse(`${error.syscall || error.name || 'ServerError'}`, 500, `${error.path || 'No Field'}`, 'create User', `${error.message}`, { error: true, operationStatus: 'Proccess Terminated!', errorSpec: error });
      return res.status(500).jsend.fail(result);
    }
  }
}
