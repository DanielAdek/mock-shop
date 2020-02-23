import { Form } from 'form-my-simple-validation';
import formSchema from '../utils/validation';
import { errorResponse, successResponse } from '../utils/response';
import * as Services from '../services';
import * as Utils from '../utils/helpers';
import db from '../models';

const { Product } = db;
/**
 * @class
 */
export default class ProductClass {
  /**
   * @method create
   * @param {object} req The request object
   * @param {object} res The response object
   * @return {*} json
   */
  static async create(req, res) {
    try {
      const {
        item, description, category, productImage
      } = req.body;

      // ensure on admin can perform this operation
      const { isAdmin, id } = req.user;
      if (!isAdmin) {
        return res.status(400).jsend.fail(errorResponse('PermissionError', 400, '', 'create product', 'Only Admin can perform this operation', { error: true, operationStatus: 'Processs Terminated!' }));
      }

      // validate form fields
      const validationResult = Form.validateFields('create_product', formSchema, req.body);

      if (validationResult.error) {
        return res.status(400).jsend.fail(validationResult);
      }

      let imageUrl = productImage;
      // check for image exists in the request body
      if (req.file) {
        const file = Utils.dataUri(req);
        // SAVES IMAGE TO CLOUDINARY
        imageUrl = await Utils.imageUpload(file, res, req.body);
        imageUrl = imageUrl.url;
      }

      // Create product
      const data = {
        userId: id, item, description, category, imageUrl
      };

      const product = await Services.insertToDataBase(Product, data);

      return res.status(201).jsend.success(successResponse('Product created!', 201, 'Create Product', {
        error: false, operationStatus: 'Operation Successful!', product
      }));
    } catch (error) {
      const result = errorResponse(`${error.syscall || error.name || 'ServerError'}`, 500, `${error.path || 'No Field'}`, 'create product', `${error.message}`, { error: true, operationStatus: 'Proccess Terminated!', errorSpec: error });
      return res.status(500).jsend.fail(result);
    }
  }

  /**
   * @method editProduct
   * @param {object} req The request object
   * @param {object} res The response object
   * @return {*} json
   */
  static async editProduct(req, res) {
    try {
      const {
        item, description, category, productImage
      } = req.body;

      // ensure on admin can perform this operation
      const { isAdmin } = req.user;
      if (!isAdmin) {
        return res.status(400).jsend.fail(errorResponse('PermissionError', 400, '', 'edit product', 'Only Admin can perform this operation', { error: true, operationStatus: 'Processs Terminated!' }));
      }

      // validate form fields
      const validationResult = Form.validateFields('edit_product', formSchema, req.body);

      if (validationResult.error) {
        return res.status(400).jsend.fail(validationResult);
      }

      const { productId: id } = req.params;

      const product = await Services.retreiveOneData(Product, { id });

      if (!product) {
        return res.status(400).jsend.fail(errorResponse('NotFound', 400, '', 'edit product', 'product does not exist', { error: true, operationStatus: 'Processs Terminated!' }));
      }

      const data = {
        item: item.trim() || product.item,
        description: description.trim() || product.description,
        category: category.trim() || product.category,
        imageUrl: productImage.trim() || product.imageUrl
      };

      await Services.modifyData(Product, data, { id });

      return res.status(200).jsend.success(successResponse('Product Edited Successfully', 200, 'edit product', {
        error: false, operationStatus: 'Operation Successful!'
      }));
    } catch (error) {
      const result = errorResponse(`${error.syscall || error.name || 'ServerError'}`, 500, `${error.path || 'No Field'}`, 'edit product', `${error.message}`, { error: true, operationStatus: 'Proccess Terminated!', errorSpec: error });
      return res.status(500).jsend.fail(result);
    }
  }

  /**
   * @method delProduct
   * @param {object} req The request object
   * @param {object} res The response object
   * @return {*} json
   */
  static async delProduct(req, res) {
    try {
      // ensure on admin can perform this operation
      const { isAdmin } = req.user;
      if (!isAdmin) {
        return res.status(400).jsend.fail(errorResponse('PermissionError', 400, '', 'delete product', 'Only Admin can perform this operation', { error: true, operationStatus: 'Processs Terminated!' }));
      }

      const { productId: id } = req.params;

      const product = await Services.retreiveOneData(Product, { id });

      if (!product) {
        return res.status(400).jsend.fail(errorResponse('NotFound', 400, '', 'delete product', 'product does not exist', { error: true, operationStatus: 'Processs Terminated!' }));
      }

      await Services.expungeData(Product, { id });

      return res.status(200).jsend.success(successResponse('Product Deleted!', 204, 'delete product', {
        error: false, operationStatus: 'Operation Successful!',
      }));
    } catch (error) {
      const result = errorResponse(`${error.syscall || error.name || 'ServerError'}`, 500, `${error.path || 'No Field'}`, 'delete product', `${error.message}`, { error: true, operationStatus: 'Proccess Terminated!', errorSpec: error });
      return res.status(500).jsend.fail(result);
    }
  }

  /**
   * @method retreiveProducts
   * @param {object} req The request object
   * @param {object} res The response object
   * @return {*} json
   */
  static async retreiveProducts(req, res) {
    try {
      const products = await Services.retreiveData(Product);

      if (!products.length) {
        return res.status(200).jsend.success(successResponse('No product found', 200, 'retreive products', {
          error: false, operationStatus: 'Operation Completed!', products
        }));
      }
      return res.status(200).jsend.success(successResponse('Product Retreived Successfully', 200, 'retreive products', {
        error: false, operationStatus: 'Operation Successful!', products
      }));
    } catch (error) {
      const result = errorResponse(`${error.syscall || error.name || 'ServerError'}`, 500, `${error.path || 'No Field'}`, 'create User', `${error.message}`, { error: true, operationStatus: 'Proccess Terminated!', errorSpec: error });
      return res.status(500).jsend.fail(result);
    }
  }
}
