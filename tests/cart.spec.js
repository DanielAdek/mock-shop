import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';
import Utils from '../server/utils/helpers';

chai.use(chaiHttp);
const { expect } = chai;

const token = Utils.generateToken('8760h', { id: 1 });

describe('CART API', () => {
  it('should add product to cart', (done) => {
    chai.request(app)
      .post('/api/v1/cart/add')
      .set('Authorization', token)
      .send({ productId: 1 })
      .end((_, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.an('object');
        expect(res.body.status).to.a('string');
        expect(res.body.data).to.an('object');
        expect(res.body.data.success).to.a('boolean');
        expect(res.body.data.message).to.a('string');
        expect(res.body.data.metadata).to.an('array');
        expect(res.body.data.details).to.be.an('object');
        expect(res.body.data.details.cart).to.be.an('object');
        expect(res.body.data.details.error).to.be.an('boolean');
        expect(res.body.data.details.operationStatus).to.be.an('string');
        expect(res.body.data.details).to.have.property('error');
        expect(res.body.data.details).to.have.property('cart');
        expect(res.body.data.details.cart).to.be.an('object');
        expect(res.body.data.message).to.equal('Product added to Cart!');
        expect(res.body.data.details).to.have.property('operationStatus');
        done();
      });
  });

  // Test for existing product
  it('should not add product to cart', (done) => {
    chai.request(app)
      .post('/api/v1/cart/add')
      .set('Authorization', token)
      .send({ productId: 700000 })
      .end((_, res) => {
        expect(res).to.have.status(404);
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

  it('should retrieve products from cart', (done) => {
    chai.request(app)
      .get('/api/v1/cart/all')
      .set('Authorization', token)
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

  it('should not delete product', (done) => {
    chai.request(app)
      .delete('/api/v1/cart/6')
      .set('Authorization', token)
      .end((_, res) => {
        expect(res).to.have.status(404);
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
        expect(res.body.data.error.message).to.equal('Cart does not exist, or does not belong to you');
        expect(res.body.data.error.details).to.have.property('operationStatus');
        done();
      });
  });

  it('should delete a product from cart', (done) => {
    chai.request(app)
      .delete('/api/v1/cart/1')
      .set('Authorization', token)
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
        expect(res.body.data.message).to.equal('Cart Deleted!');
        expect(res.body.data.details).to.have.property('operationStatus');
        done();
      });
  });

  it('should retrieve empty array', (done) => {
    chai.request(app)
      .get('/api/v1/cart/all')
      .set('Authorization', token)
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
        expect(res.body.data.message).to.equal('No product found');
        expect(res.body.data.details).to.have.property('operationStatus');
        done();
      });
  });
});
