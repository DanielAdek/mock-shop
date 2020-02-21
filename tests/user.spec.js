import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';
// import Utils from '../server/utils/helpers';

chai.use(chaiHttp);
const { expect } = chai;

// const token = Utils.generateToken('8760h', { id: user.id });

describe('SIGNUP API', () => {
  it('should register user', (done) => {
    chai.request(app)
      .post('/api/v1/users/register')
      .send({
        userName: 'new user',
        firstName: 'Daniel',
        lastName: 'Adek',
        email: 'newEmail.me1@gmail.com',
        password: 'password'
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
        expect(res.body.data.details.user).to.be.an('object');
        expect(res.body.data.details.error).to.be.an('boolean');
        expect(res.body.data.details.operationStatus).to.be.an('string');
        expect(res.body.data.details).to.have.property('error');
        expect(res.body.data.details).to.have.property('token');
        expect(res.body.data.message).to.equal('Account created!');
        expect(res.body.data.details).to.have.property('operationStatus');
        done();
      });
  });

  it('should not register user', (done) => {
    chai.request(app)
      .post('/api/v1/users/register')
      .send({
        userName: 'new user',
        firstName: 'Daniel',
        lastName: 'Adek',
        email: 'newEmail.me1@gmail.com',
        password: 'password'
      })
      .end((_, res) => {
        expect(res).to.have.status(409);
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
        expect(res.body.data.error.message).to.equal('Email already exist');
        expect(res.body.data.error.details).to.have.property('operationStatus');
        done();
      });
  });
});

describe('LOGIN API', () => {
  it('should login user', (done) => {
    chai.request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'admin@gmail.com',
        password: 'password'
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
        expect(res.body.data.details.user).to.be.an('object');
        expect(res.body.data.details.error).to.be.an('boolean');
        expect(res.body.data.details.operationStatus).to.be.an('string');
        expect(res.body.data.details).to.have.property('error');
        expect(res.body.data.details).to.have.property('token');
        expect(res.body.data.message).to.equal('Login Successful');
        expect(res.body.data.details).to.have.property('operationStatus');
        done();
      });
  });

  // Test for unauthenticated user
  it('should not login user', (done) => {
    chai.request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'fake@fake.com',
        password: 'password'
      })
      .end((_, res) => {
        expect(res).to.have.status(409);
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
        expect(res.body.data.error.message).to.equal('Email not found');
        expect(res.body.data.error.details).to.have.property('operationStatus');
        done();
      });
  });

  // Test for incorrect password
  it('should not login user', (done) => {
    chai.request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'admin@gmail.com',
        password: 'fake-password'
      })
      .end((_, res) => {
        expect(res).to.have.status(409);
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
        expect(res.body.data.error.message).to.equal('password incorrect');
        expect(res.body.data.error.details).to.have.property('operationStatus');
        done();
      });
  });
});
