/* eslint-disable jsx-quotes, react/prop-types, max-len, no-underscore-dangle, arrow-body-style */

import React from 'react';
import DisplayCreatures from './DisplayCreatures';
import DisplayWeapons from './DisplayWeapons';

class Fight extends React.Component {
  constructor(props) {
    super(props);
    this.state = { creatures: [],
                    weapons: [],
                    creature1: '',
                    creature2: '',
                    weapon1: '',
                    weapon2: '',
                    firstPlayer: true,
                    gameOver: false,
                    fightTimer: 0,
                               };
    this.takeTurn = this.takeTurn.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.startFight = this.startFight.bind(this);
  }

  componentDidMount() {
    // Load Creatures
    fetch('//localhost:3334/creature')
    .then(r => r.json())
    .then(creatures => {
    // Load weapons
      fetch('//localhost:3334/weapon')
        .then(r2 => r2.json())
        .then(weapons => {
          this.setState({ creatures: creatures.creatures, weapons: weapons.weapons });
        });
    });
  }

  gameOver() {
    const name = this.refs.name.value;
    const image = this.refs.image.value;
    fetch('//localhost:3334/creature/', { method: 'post', body: JSON.stringify({ name, image }), headers: { 'Content-Type': 'application/json' } })
    .then((r) => r.json())
    .then((data) => {
      // console.log('here in the submit');
      this.setState({ creatures: data.creatures });
    });
  }

  startFight() {
    // Start Timer
    this.state.fightTimer = setInterval(this.takeTurn, 1000);
    this.state.creature1 = this.state.creatures.find(c => c.name === this.refs.creature1.value);
    this.state.weapon1 = this.state.weapons.find(w => w.name === this.refs.weapon1.value);
    this.state.creature2 = this.state.creatures.find(c => c.name === this.refs.creature2.value);
    this.state.weapon2 = this.state.weapons.find(w => w.name === this.refs.weapon2.value);
  }

  takeTurn() {
    if (this.state.gameOver) {
      this.gameOver;
    }
    if (this.state.firstPlayer) {
      this.state.firstPlayer = false;
      const damage1 = Math.floor(Math.random() * this.state.weapon1.attack);
      this.state.creature2.health -= damage1;
      console.log("Player 1s Turns", `damage ${damage1} health2 ${this.state.creature2.health}`);
      if (this.state.creature2.health < 1) this.state.gameOver = true;
    } else {
      this.state.firstPlayer = true;
      const damage2 = Math.floor(Math.random() * this.state.weapon2.attack);
      this.state.creature1.health -= damage2;
      console.log("Player 2s Turns", `damage ${damage2} health1 ${this.state.creature1.health}`);
      if (this.state.creature1.health < 1) this.state.gameOver = true;
    }
    //  clearInterval(fightTimer);
    // update health to 100 for each creature -> set state
    // update wins
    // update losses
    // refresh?
  }

  render() {
    let fightHtml = null;

    if (this.state.creatures) {
      fightHtml = (
        <div>
          <div className='col-xs-12'>
            <div>
              <div><h2>Select Creature 1</h2></div>
              <ul>
                <div className='form-group'>
                  <label>Creature 1</label>
                  <select className='form-control' ref='creature1'>
                  {this.state.creatures.map((c, i) => <option key={i}>{c.name}</option>)}
                  </select>
                </div>
                <div className='form-group'>
                  <label>Select Weapon 1</label>
                  <select className='form-control' ref='weapon1'>
                  {this.state.weapons.map((w, i) => <option key={i}>{w.name}</option>)}
                  </select>
                </div>
              </ul>
            </div>
          </div>
          <div className='col-xs-12'>
            <div>
              <div><h2>Select Creature 2</h2></div>
              <ul>
                <div className='form-group'>
                  <label>Creature 2</label>
                  <select className='form-control' ref='creature2'>
                  {this.state.creatures.map((c, i) => <option key={i}>{c.name}</option>)}
                  </select>
                </div>
                <div className='form-group'>
                  <label>Select Weapon 2</label>
                  <select className='form-control' ref='weapon2'>
                  {this.state.weapons.map((w, i) => <option key={i}>{w.name}</option>)}
                  </select>
                </div>
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      fightHtml = (
        <div>
          <h2>No Creatures Or Weapons Yet</h2>
        </div>
      );
    }

    return (
      <div className='col-xs-4'>
        <div>
          {fightHtml}
        </div>
        <button className='btn btn-primary' onClick={this.startFight}>Start Fight</button>
      </div>
    );
  }
}

export default Fight;
