import express from 'express';

import Sequelize from 'sequelize';

import { Place, Vote, Voice } from '../sequelize';

import voteRouter from './votes'

const router = express.Router();

const Op = Sequelize.Op;

router.use('/vote', voteRouter);

router.get('/places/list', (req, res) => {

  if (req.query.ne_lat && req.query.ne_lng && req.query.sw_lat && req.query.sw_lng) {

    Place.findAll({
      where: {
        lat: {
          [Op.between]: [req.query.ne_lat, req.query.sw_lat]
        },
        lng: {
          [Op.between]: [req.query.ne_lng, req.query.sw_lng]
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

router.post('/vote/add/voice', (req, res) => {
  Voice.create({
    voteId: req.body.vote_id,
    placeId: req.body.place_id
  }).then(() => {
    res.json({ vote: true })
  })
});

router.get('/vote/get/voice', (req, res) => {
  Voice.findAndCountAll({
    where: {
      voteId: req.query.vote_id,
      placeId: req.query.place_id
    }
  }).then(voices=>{
    res.json(voices)
  })
});

export default router;
