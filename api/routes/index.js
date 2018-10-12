import express from 'express';

import Sequelize from 'sequelize';

import { Place, Voice } from '../sequelize';

import voteRouter from './votes'
import voiceRouter from './voices'

const router = express.Router();

const Op = Sequelize.Op;

router.use('/vote', voteRouter);

router.use('/voice', voiceRouter);

// Return a list of places. Need 4 coordinates
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
});

export default router;
