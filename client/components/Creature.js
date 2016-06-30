/* eslint-disable jsx-quotes, react/prop-types, max-len, no-underscore-dangle, arrow-body-style */

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
    .then(data => {
      // console.log('here in the mount. creatures:', data.creatures);
      this.setState({ creatures: data.creatures });
    });
  }

  submit() {
    const name = this.refs.name.value;
    const image = this.refs.image.value;
    fetch('//localhost:3334/creature/', { method: 'post', body: JSON.stringify({ name, image }), headers: { 'Content-Type': 'application/json' } })
    .then((r) => r.json())
    .then((data) => {
      // console.log('here in the submit');
      this.setState({ creatures: data.creatures });
    });
  }

  render() {
    let creatureHtml = null;

    if (this.state.creatures) {
      creatureHtml = (
        <div>
          <div><h2>Current Creature List</h2></div>
          <ul>
            {this.state.creatures.map((creature) => {
              return <DisplayCreatures key={creature._id} creature={creature} />;
            })}
          </ul>
        </div>
      );
    } else {
      creatureHtml = (
        <div>
          <h2>No Creatures Yet</h2>
        </div>
      );
    }

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
        <div>
          {creatureHtml}
        </div>
      </div>
    );
  }
}

export default Creature;
