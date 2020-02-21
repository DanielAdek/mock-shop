import { Form } from 'form-my-simple-validation';
import formSchema from '../utils/validation';
import { errorResponse, successResponse } from '../utils/response';
import * as Services from '../services';
import db from '../models';

const { Cart, Product, User } = db;
/**
 * @class
 */
export default class CartClass {
  /**
   * @method addToCart
   * @param {object} req The request object
   * @param {object} res The response object
   * @return {*} json
   */
  static async addToCart(req, res) {
    try {
      const { productId } = req.body;

      const { id: userId } = req.user;

      // validate form fields
      const validationResult = Form.validateFields('add_cart', formSchema, req.body);

      if (validationResult.error) {
        return res.status(400).jsend.fail(validationResult);
      }

      // confirm product id exist in database
      const product = await Services.retreiveOneData(Product, { id: productId });

      if (!product) {
        return res.status(404).jsend.fail(errorResponse('NotFound', 404, '', 'create cart', 'product does not exist', { error: true, operationStatus: 'Processs Terminated!' }));
      }

      // Create product
      const data = { userId, productId };

      const cart = await Services.insertToDataBase(Cart, data);

      return res.status(200).jsend.success(successResponse('Product added to Cart!', 200, 'add to cart', {
        error: false, operationStatus: 'Operation Successful!', cart
      }));
    } catch (error) {
      const result = errorResponse(`${error.syscall || error.name || 'ServerError'}`, 500, `${error.path || 'No Field'}`, 'add cart', `${error.message}`, { error: true, operationStatus: 'Proccess Terminated!', errorSpec: error });
      return res.status(500).jsend.fail(result);
    }
  }

  /**
   * @method delCart
   * @param {object} req The request object
   * @param {object} res The response object
   * @return {*} json
   */
  static async delCart(req, res) {
    try {
      const { cartId: id } = req.params;

      const cart = await Services.retreiveOneData(Cart, { id, userId: req.user.id });

      if (!cart) {
        return res.status(404).jsend.fail(errorResponse('NotFound', 404, '', 'delete cart', 'Cart does not exist, or does not belong to you', { error: true, operationStatus: 'Processs Terminated!' }));
      }

      await Services.expungeData(Cart, { id, userId: req.user.id });

      return res.status(200).jsend.success(successResponse('Cart Deleted!', 204, 'delete cart', {
        error: false, operationStatus: 'Operation Successful!',
      }));
    } catch (error) {
      const result = errorResponse(`${error.syscall || error.name || 'ServerError'}`, 500, `${error.path || 'No Field'}`, 'delete product from cart', `${error.message}`, { error: true, operationStatus: 'Proccess Terminated!', errorSpec: error });
      return res.status(500).jsend.fail(result);
    }
  }

  /**
   * @method retreiveProductFromCart
   * @param {object} req The request object
   * @param {object} res The response object
   * @return {*} json
   */
  static async retreiveProductsFromCart(req, res) {
    try {
      const filter = { userId: req.user.id };

      const products = await Services.retrieveCarts(Cart, filter, Product);

      if (!products.length) {
        return res.status(200).jsend.success(successResponse('No product found', 200, 'retreive products from cart', {
          error: false, operationStatus: 'Operation Completed!', products
        }));
      }
      return res.status(200).jsend.success(successResponse('Product Retreived Successfully', 200, 'retreive products from cart', {
        error: false, operationStatus: 'Operation Successful!', products
      }));
    } catch (error) {
      const result = errorResponse(`${error.syscall || error.name || 'ServerError'}`, 500, `${error.path || 'No Field'}`, 'retrieve product from cart', `${error.message}`, { error: true, operationStatus: 'Proccess Terminated!', errorSpec: error });
      return res.status(500).jsend.fail(result);
    }
  }
}
