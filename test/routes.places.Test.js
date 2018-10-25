import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

let should = chai.should();

chai.use(chaiHttp);

describe('/POST create a vote', () => {
    it('it should create a vote', (done) => {
        let vote = {
            date:"2018-10-08 11:46:03.152 +00:00",
            email:"bob@bob.com",
            pseudo:"bob"
        }
        chai.request(server)
            .post('/api/vote/add')
            .send(vote)
            .end((err,res) => {
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
            })

    })
})
