import App from './components/App';
import Creature from './components/Creature';
import Fight from './components/Fight';
import Weapon from './components/Weapon';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
require('es6-promise').polyfill();
require('isomorphic-fetch');

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Fight} />
      <Route path="creature" component={Creature} />
      <Route path="weapon" component={Weapon} />
    </Route>
  </Router>
  , document.getElementById('root'));
