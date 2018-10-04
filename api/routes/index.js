import express from 'express';
import { Place, Lunch, Type } from '../sequelize'
const router = express.Router();

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
  Lunch.findAll().then(lunches => res.json(lunches))
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

export default router;
