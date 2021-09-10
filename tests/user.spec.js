const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const testingData = require('./testingData');

chai.should();
chai.use(chaiHttp);
describe('USER LOGIN', () => {
  let token;
  it('it should login with the provided credentials', (done) => {
    chai
      .request(server)
      .post('/api/user/auth/login')
      .set('content-type', 'application/json')
      .set('accept', 'application/json')
      .send(JSON.stringify(testingData.authDataUser))
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
      .get('/api/user/profile')
      .set('content-type', 'application/json')
      .set('accept', 'application/json')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eq(true);
        res.body.should.have.property('user');
        res.body.user.should.be.a('object');
        done();
      });
  });
  it('It should update the profile', (done) => {
    chai
      .request(server)
      .put('/api/user/profile')
      .set('content-type', 'application/json')
      .set('Authorization', token)
      .set('accept', 'application/json')
      .send(JSON.stringify(testingData.editProfile))
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eq(true);
        res.body.should.have.property('user');
        res.body.user.should.be.a('object');
        done();
      });
  });
});
