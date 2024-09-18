import React from 'react';
import "./Card.css";
import uuid from "react-uuid";

const Card = ({pokemon}) => {
  return (
    <div className='card'>
      <div className="cardimg">
        <img src={pokemon.sprites.front_default} />
      </div>
      <h3 className='cardname'>{pokemon.name}</h3>
      <div className='cardtype'>
        <div>タイプ</div>
        {pokemon.types.map((type) => {
          return (
            <div key={uuid()}>
              <span className='typename'>{type.type.name}</span>
            </div>
          );
        })}
      </div>
      <div className='cardinfo'>
        <div className='carddata'>
          <p className="title">重さ:{pokemon.weight}</p>
        </div>
        <div className='carddata'>
          <p className="title">高さ:{pokemon.height}</p>
        </div>
        <div className='carddata'>
          <p className="title">能力:{pokemon.abilities[0].ability.name}</p>
        </div>
      </div>
    </div>
  )
}

export default Card