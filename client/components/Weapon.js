/* eslint-disable jsx-quotes, react/prop-types, max-len */
/* eslint-disable func-names, no-underscore-dangle, arrow-body-style */

import React from 'react';
import DisplayWeapons from './DisplayWeapons';

class Weapon extends React.Component {
  constructor(props) {
    super(props);
    this.state = { weapons: [] };
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    fetch('//localhost:3334/weapon')
    .then(r => r.json())
    .then(weapons => {
      // console.log('in the weapon mount. weapons:', weapons);
      this.setState({ weapons });
    });
  }

  submit() {
    const name = this.refs.name.value;
    const image = this.refs.image.value;
    const attack = this.refs.attack.value;
    console.log("Attack", attack);
    fetch('//localhost:3334/weapon/', { method: 'post', body: JSON.stringify({ name, image, attack }), headers: { 'Content-Type': 'application/json' } })
    .then((r) => r.json())
    .then((data) => {
      this.setState({ weapons: data });
    });
  }

  render() {
    let weaponHtml = null;

    // console.log('in the render.  this.state.weapons.weapons:', this.state.weapons.weapons);
    if (this.state.weapons.weapons) {
      weaponHtml = (
        <div>
          <div><h2>Current Weapon List</h2></div>
          <ul>
            {this.state.weapons.weapons.map((weapon) => {
              return <DisplayWeapons key={weapon._id} weapon={weapon} />;
            })}
          </ul>
        </div>
      );
    } else {
      weaponHtml = (
        <div>
          <h2>No Weapons Yet</h2>
        </div>
      );
    }


    return (
      <div className='col-xs-4'>
        <h1>Create Weapon</h1>
        <div className='form-group'>
          <label>Name</label>
          <input className='form-control' ref='name' type='text' />
        </div>
        <div className='form-group'>
          <label>Attack</label>
          <input className='form-control' ref='attack' type='text' />
        </div>
        <div className='form-group'>
          <label>Image</label>
          <input className='form-control' ref='image' type='text' />
        </div>
        <button className='btn btn-primary' onClick={this.submit}>Create</button>
        <div>
          {weaponHtml}
        </div>
      </div>
    );
  }
}

export default Weapon;
