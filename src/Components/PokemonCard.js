import React from 'react'
import Router from "next/router";
import styles from "@/styles/Pokemon.module.css";
const PokemonCard = ({ pokemon, pkColors }) => {
    const firstType = pokemon?.types[0].type.name;
    const backgroundColor = pkColors[firstType];
  
    return (
      <div
        key={pokemon.id}
        className="card"
        style={{
          backgroundColor,
        }}
        onClick={() => {
          Router.push(`/pokemon/${pokemon.name}`);
        }}
      >
        <div className="card-image">
          <img
            src={pokemon.sprites.other.home.front_shiny}
            alt={pokemon.name}
          />
        
        </div>
        <div className="card-body">
          <h3>{pokemon.name}</h3>
    
          <p className={styles.cardPara}>
            {pokemon?.types?.map((type) => {
              return <p key={type.type.name}>{type.type.name},</p>;
            })}
          </p>
           <h5 className={styles.details}>More Details &nbsp; &rarr;</h5>
        </div>
      </div>
    );
  };

export default PokemonCard