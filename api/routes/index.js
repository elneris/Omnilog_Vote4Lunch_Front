import express from 'express';

import Sequelize from 'sequelize';

import { Place, Vote } from '../sequelize';

const router = express.Router();

const Op = Sequelize.Op;

router.post('/api/vote/add', (req, res) => {

  const makeid = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

  Vote
    .create({
      pseudo: req.body.pseudo,
      email: req.body.email,
      date: req.body.date,
      url: makeid()
    })
    .then(vote => res.json(vote))
})

router.post('/api/vote/add/place', (req, res) => {
  Vote
    .findById(req.body.vote_id)
    .then(vote => {
      Place.findById(req.body.place_id)
      .then(place => {
        vote.addPlace(place)
        return place
        }).then( place => {
          res.json({added: true,place:place.dataValues})
      })
        
    })
    
  });

router.post('/api/vote/del/place', (req, res) => {
    Vote
      .findById(req.body.vote_id)
      .then(vote => {
        Place.findById(req.body.place_id)
        .then(place => { vote.removePlace(place)})
      })
      .then( () => res.json({deleted: true}))
});

router.get('/api/places/list', (req, res) => {

  if (req.query.ne_lat && req.query.ne_lng && req.query.sw_lat && req.query.sw_lng) {
    
    Place.findAll({
      where: {
        lat: {
          [Op.between] : [req.query.ne_lat,req.query.sw_lat]
        },
        lng: {
          [Op.between] : [req.query.ne_lng,req.query.sw_lng]
        },
      }
    }).then(places => {

      if (places.length === 0) {

        res.json([])
      } else {
        res.json(places)
      }
    })

  } else {
    res.sendStatus(400);
  }
})

export default router;
