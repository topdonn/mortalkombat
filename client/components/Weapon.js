/* eslint-disable jsx-quotes, react/prop-types */

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
      this.setState({ weapons });
    });
  }

  submit() {
    const name = this.refs.name.value;
    const image = this.refs.image.value;
    const power = this.refs.power.value;
    fetch('//localhost:3334/weapon/', { method: 'post', body: JSON.stringify({ name, image, power }), headers: { 'Content-Type': 'application/json' } })
    .then((r) => r.json())
    .then((data) => {
      this.setState({ weapons: data });
    });
  }

  render() {
    return (
      <div className='col-xs-4'>
        <h1>Create Weapon</h1>
        <div className='form-group'>
          <label>Name</label>
          <input className='form-control' ref='name' type='text' />
        </div>
        <div className='form-group'>
          <label>Power</label>
          <input className='form-control' ref='power' type='text' />
        </div>
        <div className='form-group'>
          <label>Image</label>
          <input className='form-control' ref='image' type='text' />
        </div>
        <button className='btn btn-primary' onClick={this.submit}>Create</button>
        <div><DisplayWeapons data={this.state.weapons} /></div>
      </div>
    );
  }
}

export default Weapon;
