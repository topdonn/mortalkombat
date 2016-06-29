/* eslint-disable jsx-quotes, react/prop-types */

import React from 'react';
import DisplayCreatures from './DisplayCreatures';

class Creature extends React.Component {
  constructor(props) {
    super(props);
    this.state = { creatures: [] };
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    fetch('//localhost:3334/creature')
    .then(r => r.json())
    .then(creatures => {
      this.setState({ creatures });
    });
  }

  submit() {
    const name = this.refs.name.value;
    const image = this.refs.image.value;
    fetch('//localhost:3334/creature/', { method: 'post', body: JSON.stringify({ name, image }), headers: { 'Content-Type': 'application/json' } })
    .then((r) => r.json())
    .then((data) => {
      this.setState({ creatures: data });
    });
  }

  render() {
    return (
      <div className='col-xs-4'>
        <h1>Create A Creature</h1>
        <div className='form-group'>
          <label>Name</label>
          <input className='form-control' ref='name' type='text' />
        </div>
        <div className='form-group'>
          <label>Image</label>
          <input className='form-control' ref='image' type='text' />
        </div>
        <button className='btn btn-primary' onClick={this.submit}>Create</button>
        <div><DisplayCreatures data={this.state.creatures} /></div>
      </div>
    );
  }
}

export default Creature;
