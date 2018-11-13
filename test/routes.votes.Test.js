/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import { Vote } from '../sequelize';
// eslint-disable-next-line no-unused-vars
const should = chai.should();

chai.use(chaiHttp);

describe('Test Votes routes', () => {
  it('/POST it should create a vote', (done) => {
    const vote = {
      date: '2018-10-08 00:00:00 +00:00',
      end_date: '2018-10-08 12:00:00 +00:00',
      email: 'bob@bob.com',
      pseudo: 'bob',
      url: 'f4k3Url'
    };
    chai.request(server)
      .post('/api/vote/add')
      .send(vote)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('pseudo');
        res.body.should.have.property('email');
        res.body.should.have.property('date');
        res.body.should.have.property('url');
        res.body.should.have.property('updatedAt');
        res.body.should.have.property('createdAt');
        res.body.should.have.property('active').null;
        done();
      });
  });

  it('/POST it should delete a vote', (done) => {
    Vote.create({
      date: '2018-10-08 00:00:00 +00:00',
      end_date: '2018-10-08 12:00:00 +00:00',
      email: 'bob@bob.com',
      pseudo: 'bob',
      url: 'f4k3Url'
    })
      .then((vote) => {
        const payload = {
          vote_url: vote.dataValues.url
        };
        chai.request(server)
          .post('/api/vote/del')
          .send(payload)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('delete').true;
            done();
          });
      });
  });

  it('/GET it should get a vote', (done) => {
    Vote.create({
      date: '2018-10-08 00:00:00 +00:00',
      end_date: '2018-10-08 12:00:00 +00:00',
      email: 'bob@bob.com',
      pseudo: 'bob',
      url: 'f4k3Url'
    })
      .then((vote) => {
        const voteUrl = vote.dataValues.url;
        chai.request(server)
          .get(`/api/vote/get?vote_url=${voteUrl}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('pseudo');
            res.body.should.have.property('email');
            res.body.should.have.property('date');
            res.body.should.have.property('end_date');
            res.body.should.have.property('url');
            res.body.should.have.property('updatedAt');
            res.body.should.have.property('createdAt');
            done();
          });
      });
  });

  it('/GET it should get all votes form a user', (done) => {
    Vote.create({
      date: '2018-10-08 00:00:00 +00:00',
      end_date: '2018-10-08 12:00:00 +00:00',
      email: 'bob@bob.com',
      pseudo: 'bob',
      url: 'f4k3Url'
    })
      .then((vote) => {
        const { pseudo } = vote.dataValues;
        chai.request(server)
          .get(`/api/vote/get/mine?pseudo=${pseudo}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body[0].should.be.a('object');
            res.body[0].should.have.property('id');
            res.body[0].should.have.property('pseudo');
            res.body[0].should.have.property('email');
            res.body[0].should.have.property('date');
            res.body[0].should.have.property('end_date');
            res.body[0].should.have.property('url');
            res.body[0].should.have.property('updatedAt');
            res.body[0].should.have.property('createdAt');
            done();
          });
      });
  });
});
