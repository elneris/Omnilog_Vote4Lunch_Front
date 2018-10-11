import express from 'express';

import { Place, Vote } from '../../sequelize';

const router = express.Router();

// Return a random string to use it as a short URL
const makeid = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

// Create a vote and return vote data
router.post('/add', (req, res) => {

    Vote
        .create({
            pseudo: req.body.pseudo,
            email: req.body.email,
            date: req.body.date,
            url: makeid()
        })
        .then(vote => res.json(vote))
})

// Get a vote from his url field and return it
router.get('/get', (req, res) => {

    Vote
        .findOne({
            where: {
                url: req.query.vote_url
            }
        })
        .then(vote => {
            res.json(vote)
        })
})

// Add a place to a vote and return it
router.post('/add/place', (req, res) => {
    Vote
      .findById(req.body.vote_id)
      .then(vote => {
        Place.findById(req.body.place_id)
          .then(place => {
            vote.addPlace(place)
            return place
          }).then(place => {
            res.json({ added: true, place: place.dataValues })
          })
  
      })
  
  });

// Delete a place from a vote and return it  
  router.post('/del/place', (req, res) => {
    Vote
      .findById(req.body.vote_id)
      .then(vote => {
        Place.findById(req.body.place_id)
          .then(place => {
            vote.removePlace(place)
            return place
          }).then((place) => res.json({ deleted: true, place: place.dataValues }))
      })
  });

// Get the list of places for a vote. Vote is find with url
  router.post('/get/places/list', (req, res) => {
    Vote
      .findOne({
        where: {
          url: req.body.vote_url
        }
      })
      .then(vote => {
        Place.findAll({
          include: {
            model: Vote, where: {
              id: vote.id
            }
          }
        }).then(places => {
          res.json(places)
        })
      })
  });

export default router;