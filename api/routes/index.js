import express from 'express';

import Sequelize from 'sequelize'

import { Place, Lunch, Vote } from '../sequelize'

const router = express.Router();

const Op = Sequelize.Op

router.get('/api/places', (req, res) => {

  if (req.query.ne_lat && req.query.ne_lng && req.query.sw_lat && req.query.sw_lng) {

    Place.findAll().then(places => {
      console.log(places);

      if (places.length === 0) {

        res.json('no results ')
      } else {
        res.json(places)
      }
    })

  } else {
    res.sendStatus(400);
  }
})

router.get('/api/lunch/today', (req, res) => {
  Lunch.findAll({
    include: [{
      model: Place,
      as: 'place'
    }]
  }).then(lunches => res.json(lunches))
})

router.post('/api/lunch/add', (req, res) => {
  console.log(req.body);
  
  Lunch
    .create({
      username: req.body.username,
      date: req.body.date,
      place: {
        name: req.body.place_name,
        lat: parseFloat(req.body.place_lat),
        lng: parseFloat(req.body.place_lng),
        type: {
          name: req.body.type_name
        }
      }}, {
      include: [{
        association: Lunch.Place,
        include: [{
          association: Place.Type
        }]
      }]
  })
  .then( () => res.sendStatus(200))
});

router.post('/api/vote/add', (req, res) => {

  console.log(req.body.date);
  /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(req.body.date)
  const formattedDate = new Date(RegExp.$3 + '-' + RegExp.$2 + '-' + RegExp.$1)
  console.log(formattedDate);

  Vote
    .create({
      pseudo: req.body.pseudo,
      email: req.body.email,
      // date: formattedDate
      date: req.body.date
    })
    .then(vote => res.json(vote))
})

router.post('/api/vote/add/place', (req, res) => {
  Vote
    .findById(req.body.vote_id)
    .then(vote => {
      Place.findById(req.body.place_id)
      .then(place => { vote.addPlace(place)})
    })
    .then( () => res.json({added: true}))
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

        res.json('[]')
      } else {
        res.json(places)
      }
    })

  } else {
    res.sendStatus(400);
  }
})

export default router;
