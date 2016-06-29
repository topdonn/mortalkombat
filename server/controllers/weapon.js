/* eslint-disable new-cap, array-callback-return, no-param-reassign */
import express from 'express';
import Weapon from '../models/weapon';
const router = module.exports = express.Router();

router.get('/', (req, res) => {
  Weapon.find((err, weapons) => {
    res.send({ weapons });
  });
});

router.post('/', (req, res) => {
  const weapon = new Weapon(req.body);
  weapon.save(() => {
    res.send({ weapon });
  });
});
