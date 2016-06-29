import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const creatureSchema = new Schema({
  name: { type: String },
  health: { type: Number, default: 100 },
  image: { type: String },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
});

module.exports = mongoose.model('Creature', creatureSchema);
