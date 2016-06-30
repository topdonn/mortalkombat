/* eslint-disable func-names, no-underscore-dangle, arrow-body-style */
/* eslint-disable jsx-quotes, react/prop-types, max-len, no-underscore-dangle */
import React from 'react';

export default (props) => {
  // const data = props.data;
  // console.log('here in display creature. props:', props);
  return (
    <div>
      <div><h3>Name: {props.creature.name}</h3></div>
      <img src={props.creature.image} alt="creature" height="100" width="100"></img>
      <div> Wins: {props.creature.wins}</div>
      <div> Losses: {props.creature.losses}</div>
      <div><h3> </h3></div>
    </div>
  );
};
