const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const testingData = require('./testingData');

chai.should();
chai.use(chaiHttp);

describe('DRIVER', () => {
  let token;
  it('it should login with the provided credentials', (done) => {
    chai
      .request(server)
      .post('/api/driver/auth/login')
      .set('content-type', 'application/json')
      .set('accept', 'application/json')
      .send(JSON.stringify(testingData.authDataDriver))
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eq(true);
        res.body.should.have.property('token');
        token = res.body.token;
        done();
      });
  });
  it('it should get the profile', (done) => {
    chai
      .request(server)
      .get('/api/driver/profile')
      .set('content-type', 'application/json')
      .set('accept', 'application/json')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eq(true);
        res.body.should.have.property('driver');
        res.body.driver.should.be.a('object');
        done();
      });
  });
  it('It should update the profile', (done) => {
    chai
      .request(server)
      .put('/api/driver/profile')
      .set('content-type', 'application/json')
      .set('Authorization', token)
      .set('accept', 'application/json')
      .send(JSON.stringify(testingData.editDriverProfile))
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eq(true);
        res.body.should.have.property('driver');
        res.body.driver.should.be.a('object');
        done();
      });
  });
});
