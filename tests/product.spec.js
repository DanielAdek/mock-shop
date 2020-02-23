import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';
import * as Utils from '../server/utils/helpers';

chai.use(chaiHttp);
const { expect } = chai;

const adminToken = Utils.generateToken('8760h', { id: 1 });
const token = Utils.generateToken('8760h', { id: 2 });

describe('PRODUCT API', () => {
  it('should create product', (done) => {
    chai.request(app)
      .post('/api/v1/product/create')
      .set('Authorization', adminToken)
      .send({
        item: 'T-shirt',
        description: 'Nice t-shirt',
        category: 'fashion',
        productImage: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1536757459/dummy-profile.png'
      })
      .end((_, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.an('object');
        expect(res.body.status).to.a('string');
        expect(res.body.data).to.an('object');
        expect(res.body.data.success).to.a('boolean');
        expect(res.body.data.message).to.a('string');
        expect(res.body.data.metadata).to.an('array');
        expect(res.body.data.details).to.be.an('object');
        expect(res.body.data.details.product).to.be.an('object');
        expect(res.body.data.details.error).to.be.an('boolean');
        expect(res.body.data.details.operationStatus).to.be.an('string');
        expect(res.body.data.details).to.have.property('error');
        expect(res.body.data.details).to.have.property('product');
        expect(res.body.data.details.product).to.be.an('object');
        expect(res.body.data.message).to.equal('Product created!');
        expect(res.body.data.details).to.have.property('operationStatus');
        done();
      });
  });

  // Test for admin operation only
  it('should not create product', (done) => {
    chai.request(app)
      .post('/api/v1/product/create')
      .set('Authorization', token)
      .send({
        item: 'T-shirt',
        description: 'Nice t-shirt',
        category: 'fashion',
        productImage: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1536757459/dummy-profile.png'
      })
      .end((_, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.an('object');
        expect(res.body.status).to.a('string');
        expect(res.body.data).to.an('object');
        expect(res.body.data.error).to.an('object');
        expect(res.body.data.error.error).to.a('boolean');
        expect(res.body.data.error.message).to.a('string');
        expect(res.body.data.error.metadata).to.an('array');
        expect(res.body.data).to.have.property('error');
        expect(res.body.data.error.details).to.be.an('object');
        expect(res.body.data.error).to.have.property('Stacktrace');
        expect(res.body.data.error.details.error).to.be.a('boolean');
        expect(res.body.data.error.details.operationStatus).to.be.a('string');
        expect(res.body.data.error.details).to.have.property('error');
        expect(res.body.data.error.message).to.equal('Only Admin can perform this operation');
        expect(res.body.data.error.details).to.have.property('operationStatus');
        done();
      });
  });

  it('should edit a product', (done) => {
    chai.request(app)
      .put('/api/v1/product/1')
      .set('Authorization', adminToken)
      .send({
        item: 'T-shirt',
        description: 'Nice t-shirt',
        category: 'fashion',
        productImage: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1536757459/dummy-profile.png'
      })
      .end((_, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.an('object');
        expect(res.body.status).to.a('string');
        expect(res.body.data).to.an('object');
        expect(res.body.data.success).to.a('boolean');
        expect(res.body.data.message).to.a('string');
        expect(res.body.data.metadata).to.an('array');
        expect(res.body.data.details).to.be.an('object');
        expect(res.body.data.details.error).to.be.an('boolean');
        expect(res.body.data.details.operationStatus).to.be.an('string');
        expect(res.body.data.details).to.have.property('error');
        expect(res.body.data.message).to.equal('Product Edited Successfully');
        expect(res.body.data.details).to.have.property('operationStatus');
        done();
      });
  });

  // Test for admin access only
  it('should not edit product', (done) => {
    chai.request(app)
      .put('/api/v1/product/1')
      .set('Authorization', token)
      .send({
        item: 'T-shirt',
        description: 'Nice t-shirt',
        category: 'fashion',
        productImage: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1536757459/dummy-profile.png'
      })
      .end((_, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.an('object');
        expect(res.body.status).to.a('string');
        expect(res.body.data).to.an('object');
        expect(res.body.data.error).to.an('object');
        expect(res.body.data.error.error).to.a('boolean');
        expect(res.body.data.error.message).to.a('string');
        expect(res.body.data.error.metadata).to.an('array');
        expect(res.body.data).to.have.property('error');
        expect(res.body.data.error.details).to.be.an('object');
        expect(res.body.data.error).to.have.property('Stacktrace');
        expect(res.body.data.error.details.error).to.be.a('boolean');
        expect(res.body.data.error.details.operationStatus).to.be.a('string');
        expect(res.body.data.error.details).to.have.property('error');
        expect(res.body.data.error.message).to.equal('Only Admin can perform this operation');
        expect(res.body.data.error.details).to.have.property('operationStatus');
        done();
      });
  });

  // Test for existing product
  it('should not edit product', (done) => {
    chai.request(app)
      .put('/api/v1/product/700000')
      .set('Authorization', adminToken)
      .send({
        item: 'T-shirt',
        description: 'Nice t-shirt',
        category: 'fashion',
        productImage: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1536757459/dummy-profile.png'
      })
      .end((_, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.an('object');
        expect(res.body.status).to.a('string');
        expect(res.body.data).to.an('object');
        expect(res.body.data.error).to.an('object');
        expect(res.body.data.error.error).to.a('boolean');
        expect(res.body.data.error.message).to.a('string');
        expect(res.body.data.error.metadata).to.an('array');
        expect(res.body.data).to.have.property('error');
        expect(res.body.data.error.details).to.be.an('object');
        expect(res.body.data.error).to.have.property('Stacktrace');
        expect(res.body.data.error.details.error).to.be.a('boolean');
        expect(res.body.data.error.details.operationStatus).to.be.a('string');
        expect(res.body.data.error.details).to.have.property('error');
        expect(res.body.data.error.message).to.equal('product does not exist');
        expect(res.body.data.error.details).to.have.property('operationStatus');
        done();
      });
  });

  it('should retrieve products', (done) => {
    chai.request(app)
      .get('/api/v1/product')
      .end((_, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.an('object');
        expect(res.body.status).to.a('string');
        expect(res.body.data).to.an('object');
        expect(res.body.data.success).to.a('boolean');
        expect(res.body.data.message).to.a('string');
        expect(res.body.data.metadata).to.an('array');
        expect(res.body.data.details).to.be.an('object');
        expect(res.body.data.details.products).to.be.an('array');
        expect(res.body.data.details.error).to.be.an('boolean');
        expect(res.body.data.details.operationStatus).to.be.an('string');
        expect(res.body.data.details).to.have.property('error');
        expect(res.body.data.details).to.have.property('products');
        expect(res.body.data.message).to.equal('Product Retreived Successfully');
        expect(res.body.data.details).to.have.property('operationStatus');
        done();
      });
  });

  // Test for admin access only
  it('should not delete product', (done) => {
    chai.request(app)
      .delete('/api/v1/product/1')
      .set('Authorization', token)
      .send({
        item: 'T-shirt',
        description: 'Nice t-shirt',
        category: 'fashion',
        productImage: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1536757459/dummy-profile.png'
      })
      .end((_, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.an('object');
        expect(res.body.status).to.a('string');
        expect(res.body.data).to.an('object');
        expect(res.body.data.error).to.an('object');
        expect(res.body.data.error.error).to.a('boolean');
        expect(res.body.data.error.message).to.a('string');
        expect(res.body.data.error.metadata).to.an('array');
        expect(res.body.data).to.have.property('error');
        expect(res.body.data.error.details).to.be.an('object');
        expect(res.body.data.error).to.have.property('Stacktrace');
        expect(res.body.data.error.details.error).to.be.a('boolean');
        expect(res.body.data.error.details.operationStatus).to.be.a('string');
        expect(res.body.data.error.details).to.have.property('error');
        expect(res.body.data.error.message).to.equal('Only Admin can perform this operation');
        expect(res.body.data.error.details).to.have.property('operationStatus');
        done();
      });
  });

  it('should delete a product', (done) => {
    chai.request(app)
      .delete('/api/v1/product/1')
      .set('Authorization', adminToken)
      .send({
        item: 'T-shirt',
        description: 'Nice t-shirt',
        category: 'fashion',
        productImage: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1536757459/dummy-profile.png'
      })
      .end((_, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.an('object');
        expect(res.body.status).to.a('string');
        expect(res.body.data).to.an('object');
        expect(res.body.data.success).to.a('boolean');
        expect(res.body.data.message).to.a('string');
        expect(res.body.data.metadata).to.an('array');
        expect(res.body.data.details).to.be.an('object');
        expect(res.body.data.details.error).to.be.an('boolean');
        expect(res.body.data.details.operationStatus).to.be.an('string');
        expect(res.body.data.details).to.have.property('error');
        expect(res.body.data.message).to.equal('Product Deleted!');
        expect(res.body.data.details).to.have.property('operationStatus');
        done();
      });
  });

  // Test for existing product
  it('should not delete product', (done) => {
    chai.request(app)
      .delete('/api/v1/product/700000')
      .set('Authorization', adminToken)
      .send({
        item: 'T-shirt',
        description: 'Nice t-shirt',
        category: 'fashion',
        productImage: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1536757459/dummy-profile.png'
      })
      .end((_, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.an('object');
        expect(res.body.status).to.a('string');
        expect(res.body.data).to.an('object');
        expect(res.body.data.error).to.an('object');
        expect(res.body.data.error.error).to.a('boolean');
        expect(res.body.data.error.message).to.a('string');
        expect(res.body.data.error.metadata).to.an('array');
        expect(res.body.data).to.have.property('error');
        expect(res.body.data.error.details).to.be.an('object');
        expect(res.body.data.error).to.have.property('Stacktrace');
        expect(res.body.data.error.details.error).to.be.a('boolean');
        expect(res.body.data.error.details.operationStatus).to.be.a('string');
        expect(res.body.data.error.details).to.have.property('error');
        expect(res.body.data.error.message).to.equal('product does not exist');
        expect(res.body.data.error.details).to.have.property('operationStatus');
        done();
      });
  });
});
