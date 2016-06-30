/* eslint-disable func-names, no-underscore-dangle */
/* eslint-disable jsx-quotes, react/prop-types, max-len, no-underscore-dangle */
/* eslint-disable no-unused-vars, arrow-body-style */
import React from 'react';

export default (props) => {
  // const data = props.data;
  console.log('in displayWeapons, props:', props);
  return (
    <div>
      <div><h3>Name: {props.weapon.name}</h3></div>
      <img src={props.weapon.image} alt="weapon" height="100" width="100"></img>
      <div> Attack: {props.weapon.attack}</div>
      <div><h3> </h3></div>
    </div>
  );
};
