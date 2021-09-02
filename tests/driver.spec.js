const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const testingData = require('./testingData');

chai.should();
chai.use(chaiHttp);

describe('DRIVER', () => {
  let token;
  let busID;
  let numberOfBuses;
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
  it('It should get all buses of the driver', (done) => {
    chai
      .request(server)
      .get('/api/bus')
      .set('content-type', 'application/json')
      .set('Authorization', token)
      .set('accept', 'application/json')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eq(true);
        res.body.should.have.property('buses');
        res.body.buses.should.be.a('array');
        numberOfBuses = res.body.buses.length;
        done();
      });
  });
  it('It should add bus with provided data', (done) => {
    chai
      .request(server)
      .post('/api/bus')
      .set('content-type', 'application/json')
      .set('accept', 'application/json')
      .set('Authorization', token)
      .send(JSON.stringify(testingData.addBusData))
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eq(true);
        res.body.should.have.property('bus');
        res.body.bus.should.be.a('object');
        busID = res.body.bus.id;
        done();
      });
  });
  it('It should edit bus with provided data', (done) => {
    chai
      .request(server)
      .put('/api/bus')
      .set('content-type', 'application/json')
      .set('accept', 'application/json')
      .set('Authorization', token)
      .send(JSON.stringify(testingData.editBusData))
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eq(true);
        res.body.should.have.property('bus');
        res.body.bus.should.be.a('object');
        done();
      });
  });
  it('It should delete the given bus', (done) => {
    chai
      .request(server)
      .delete('/api/bus')
      .set('content-type', 'application/json')
      .set('Authorization', token)
      .set('accept', 'application/json')
      .send(JSON.stringify(busID))
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eq(true);
        res.body.should.have.property('message').eq('Bus deleted successfully');
        done();
      });
  });
});
