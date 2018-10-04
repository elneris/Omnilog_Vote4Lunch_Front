import express from 'express';
import { Place } from '../sequelize'

const router = express.Router();

router.get('/api/places', (req, res) => {

  if (req.query.ne_lat && req.query.ne_lng && req.query.sw_lat && req.query.sw_lng) {
    console.log(req.query);
    
    res.json('pop')
  } else {
    Place.findAll().then(places => {
      console.log(places);

      if (places.length === 0) {

        res.json('no results ')
      } else {
        res.json(places)
      }
    })

  }


})

export default router;
