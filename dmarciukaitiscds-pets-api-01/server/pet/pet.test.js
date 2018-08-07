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

describe('## Pet APIs', () => {
  let pet = {
    name: 'Nelson',
    age: 'puppy',
    size: 'small',
    color: 'black',
    sex: 'male',
    description: 'im a good boy, please adopt me!',
    breed: 'dachshund'
  };

  describe('# POST /api/pets', () => {
    it('should create a new pet', (done) => {
      request(app)
        .post('/api/pets')
        .send(pet)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(pet.name);
          expect(res.body.age).to.equal(pet.age);
          expect(res.body.size).to.equal(pet.size);
          expect(res.body.color).to.equal(pet.color);
          expect(res.body.sex).to.equal(pet.sex);
          expect(res.body.description).to.equal(pet.description);
          expect(res.body.breed).to.equal(pet.breed);
          expect(res.body.adopt).to.be.undefined; // eslint-disable-line
          pet = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/pets/:petId', () => {
    it('should get pet details', (done) => {
      request(app)
        .get(`/api/pets/${pet._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(pet.name);
          expect(res.body.age).to.equal(pet.age);
          expect(res.body.size).to.equal(pet.size);
          expect(res.body.color).to.equal(pet.color);
          expect(res.body.sex).to.equal(pet.sex);
          expect(res.body.description).to.equal(pet.description);
          expect(res.body.breed).to.equal(pet.breed);
          expect(res.body.adopt).to.be.undefined; // eslint-disable-line
          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when pet does not exists', (done) => {
      request(app)
        .get('/api/pets/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /api/pets/:petId', () => {
    it('should update pet details', (done) => {
      pet.name = 'Ruben';
      request(app)
        .put(`/api/pets/${pet._id}`)
        .send(pet)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal('Ruben');
          expect(res.body.age).to.equal(pet.age);
          expect(res.body.size).to.equal(pet.size);
          expect(res.body.color).to.equal(pet.color);
          expect(res.body.sex).to.equal(pet.sex);
          expect(res.body.description).to.equal(pet.description);
          expect(res.body.breed).to.equal(pet.breed);
          expect(res.body.adopt).to.be.undefined; // eslint-disable-line
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/pets/', () => {
    it('should get all pets', (done) => {
      request(app)
        .get('/api/pets')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(1);
          done();
        })
        .catch(done);
    });

    it('should get all pets (with limit and skip)', (done) => {
      request(app)
        .get('/api/pets')
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

  describe('# POST /api/pets/:id/adopt', () => {
    it('should adopt a pet', (done) => {
      const data = {
        message: 'Quiero Adoptarlo!',
        contact: 'ana@email.com'
      };
      request(app)
        .post(`/api/pets/${pet._id}/adopt`)
        .send(data)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(pet.name);
          expect(res.body.age).to.equal(pet.age);
          expect(res.body.size).to.equal(pet.size);
          expect(res.body.color).to.equal(pet.color);
          expect(res.body.sex).to.equal(pet.sex);
          expect(res.body.description).to.equal(pet.description);
          expect(res.body.breed).to.equal(pet.breed);
          expect(res.body.adopt).to.be.a('string');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/pets/', () => {
    it('should delete pet', (done) => {
      request(app)
        .delete(`/api/pets/${pet._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(pet.name);
          expect(res.body.age).to.equal(pet.age);
          expect(res.body.size).to.equal(pet.size);
          expect(res.body.color).to.equal(pet.color);
          expect(res.body.sex).to.equal(pet.sex);
          expect(res.body.description).to.equal(pet.description);
          expect(res.body.breed).to.equal(pet.breed);
          done();
        })
        .catch(done);
    });
  });
});
