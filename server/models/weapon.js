import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const weaponSchema = new Schema({
  name: { type: String },
  attack: { type: Number },
  image: { type: String },
});

module.exports = mongoose.model('Weapon', weaponSchema);
