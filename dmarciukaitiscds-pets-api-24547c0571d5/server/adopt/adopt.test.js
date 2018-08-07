const mongoose = require('mongoose');
const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require('../../index');

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## Adopt APIs', () => {
  let adopt = {
    message: 'Yo quiero adoptarlo',
    contact: 'name@email.com'
  };

  describe('# POST /api/adopts', () => {
    it('should create a new adopt', (done) => {
      request(app)
        .post('/api/adopts')
        .send(adopt)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.message).to.equal(adopt.message);
          expect(res.body.contact).to.equal(adopt.contact);
          adopt = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/adopts/:adoptId', () => {
    it('should get adopt details', (done) => {
      request(app)
        .get(`/api/adopts/${adopt._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.message).to.equal(adopt.message);
          expect(res.body.contact).to.equal(adopt.contact);
          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when adopt does not exists', (done) => {
      request(app)
        .get('/api/adopts/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /api/adopts/:adoptId', () => {
    it('should update adopt details', (done) => {
      adopt.contact = 'new@email.com';
      request(app)
        .put(`/api/adopts/${adopt._id}`)
        .send(adopt)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.message).to.equal(adopt.message);
          expect(res.body.contact).to.equal('new@email.com');
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/adopts/', () => {
    it('should get all adopts', (done) => {
      request(app)
        .get('/api/adopts')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(1);
          done();
        })
        .catch(done);
    });

    it('should get all adopts (with limit and skip)', (done) => {
      request(app)
        .get('/api/adopts')
        .query({ limit: 10, skip: 1 })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(0);
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/adopts/', () => {
    it('should delete adopt', (done) => {
      request(app)
        .delete(`/api/adopts/${adopt._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.message).to.equal(adopt.message);
          expect(res.body.contact).to.equal(adopt.contact);
          done();
        })
        .catch(done);
    });
  });
});
