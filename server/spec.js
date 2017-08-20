var app = require('./server');
var request = require('supertest');
var chai = require('chai').expect;

// TODO: make tests for the other CRUD routes
// DELETE, UPDATE, PUT, GET ONE
// to run the test type mocha server/specs.js

describe('[LIONS]', function() {

  it('should create a new lion', function(done) {
    var lion = {
      name: 'Hassan',
      age: '4 months',
      gender: 'Male',
    };
    request(app)
    .post('/lions')
    .send(lion)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201) //201 = created
    .end(function(err, resp) {
      var hassan = resp.body
      chai(lion).to.be.an('object');
      // chai(hassan).to.eql(lion);
      done();
    })
  });

  it('should get all lions', function(done) {
    request(app)
    .get('/lions')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, resp) {
      chai(resp.body).to.be.an('array');
      done();
    })
  });

  it('should get lion by given id', function(done) {
    request(app)
    .get('/lions/1')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, resp) {
      chai(resp.body).to.be.an('object');
      done();
    })
  });

  it('should update a lion', function(done) {
    request(app)
    .post('/lions')
    .send({
      name: 'Hassan',
      age: .5,
      gender: 'Male',
    })
    .set('Accept', 'application/json')
    .end(function(err, resp) {
      var lion = resp.body;
      request(app)
      .put('/lions/' + lion.id)
      .send({
        name: 'Hasan Slaper'
      })
      .end(function(err, resp) {
        chai(resp.body.name).to.equal('Hasan Slaper');
        done();
      })
    })
  });

  it('should delete a lion', function(done) {
    request(app)
    .post('/lions')
    .send({
      name: 'Hassan',
      age: .5,
      gender: 'Male',
    })
    .set('Accept', 'application/json')
    .end(function(err, resp) {
      var lion = resp.body;
      request(app)
      .delete('/lions/' + lion.id)
      .end(function(err, resp) {
        chai(resp.body).to.eql(lion);
        done();
      })
    })
  });
});
