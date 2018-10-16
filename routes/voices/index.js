import express from 'express';

import { Voice } from '../../sequelize';

const router = express.Router();

// Add a Voice
router.post('/add', (req, res) => {
  if (req.body.vote_id && req.body.place_id && req.body.pseudo && req.body.email) {
    Voice.create({
      voteId: req.body.vote_id,
      placeId: req.body.place_id,
      pseudo: req.body.pseudo,
      email: req.body.email,
    }).then(() => {
      res.json({ vote: true })
    })
  } else {
    res.sendStatus(400)
  }    
});
  
  // Return the sum of voices for a vote and a place
  router.get('/count/all', (req, res) => {
    Voice.findAndCountAll({
      where: {
        voteId: req.query.vote_id,
        placeId: req.query.place_id
      }
    }).then(voices=>{
      res.json(voices)
    })
  });

// Verify if a user have voted for a vote
router.get('/count/foruser', (req,res) => {
  Voice.findAndCountAll({
    where: {
      voteId: req.query.vote_id,
      pseudo: req.query.pseudo,
      email: req.query.email
    }
  }).then(result=>{
    if (result.count === 0) {
      res.json({
        'vote_id':req.query.vote_id,
        'pseudo': req.query.pseudo,
        'email': req.query.email,
        'vote': false,
      })
    } else {
      res.json({
        'vote_id':req.query.vote_id,
        'pseudo': req.query.pseudo,
        'email': req.query.email,
        'vote': true,
      })
    }
  })
});

export default router;