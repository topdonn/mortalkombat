/* eslint-disable new-cap, array-callback-return, no-param-reassign */
import express from 'express';
import Creature from '../models/creature';
const router = module.exports = express.Router();

router.get('/', (req, res) => {
  Creature.find((err, creatures) => {
    res.send({ creatures });
  });
});

router.post('/', (req, res) => {
  const creature = new Creature(req.body);
  creature.save(() => {
    res.send({ creature });
  });
});

router.put('/:id', (req, res) => {
  Creature.findById(req.params.id, (err, creature) => {
    if (req.body.won) {
      creature.wins += 1;
    } else {
      creature.losses += 1;
    }
    creature.save(() => {
      res.send({ creature });
    });
  });
});
