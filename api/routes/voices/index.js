import express from 'express';

import { Voice } from '../../sequelize';

const router = express.Router();

router.post('/add', (req, res) => {
    Voice.create({
      voteId: req.body.vote_id,
      placeId: req.body.place_id,
      pseudo: req.body.pseudo,
      email: req.body.email,
    }).then(() => {
      res.json({ vote: true })
    })
  });
  
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

export default router;