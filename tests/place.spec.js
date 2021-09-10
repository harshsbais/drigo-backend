const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const testingData = require('./testingData');

chai.should();
chai.use(chaiHttp);
describe('PLACE API', () => {
  it('it should get all the places', (done) => {
    chai
      .request(server)
      .get('/api/place')
      .set('content-type', 'application/json')
      .set('accept', 'application/json')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eq(true);
        res.body.should.have.property('places');
        res.body.places.should.be.a('array');
        done();
      });
  });
  it('it should add a place', (done) => {
    chai
      .request(server)
      .post('/api/place')
      .set('content-type', 'application/json')
      .set('accept', 'application/json')
      .send(JSON.stringify(testingData.addPlaceData))
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eq(true);
        res.body.should.have.property('message').eq('Place saved successfully');
        res.body.should.have.property('place');
        res.body.place.should.be.a('object');
        done();
      });
  });
});
