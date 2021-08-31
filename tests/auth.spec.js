const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const testingData = require('./testingData');

chai.should();
chai.use(chaiHttp);
describe('USER LOGIN', () => {
  it('it should login with the provided credentials', (done) => {
    chai
      .request(server)
      .post('/api/user/auth/login')
      .set('content-type', 'application/json')
      .set('accept', 'application/json')
      .send(JSON.stringify(testingData.authDataUser))
      .end((err, res) => {
        if (err) {
          console.log('got err login', err);
          done();
        }
        console.log(res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eq(true);
        res.body.should.have.property('token');
        done();
      });
  });
});

describe('DRIVER LOGIN', () => {
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
        done();
      });
  });
});
