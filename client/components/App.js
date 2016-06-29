import React from 'react';
import { Link } from 'react-router';

export default class App extends React.Component {
  render(){

    return (
      <div>
        <h1>Mortak Kombat - Lets Fight!</h1>
        <ul>
          <li><Link to="/">Fight</Link></li>
          <li><Link to="/creature">Creature</Link></li>
          <li><Link to="/weapon">Weapon</Link></li>
        </ul>


        {this.props.children}
      </div>
    );
  }
}
