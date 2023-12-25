import { useGlobalContext } from "@/context/global";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "@/styles/Pokemon.module.css";
import Loading from "@/Components/Loading";
import PokemonStats from "@/Components/PokemonStats";
function Pokemon() {
  const router = useRouter();
  
  const { pokemon } = router.query;

  const { getPokemon, loading, pokemon: pokemonItem } = useGlobalContext();
  
  const handleClose = () => {
    
    router.push("/");
  };
  useEffect(() => {

    if (pokemon) {
      getPokemon(pokemon);
    }
  }, [pokemon]);

  let myLink = "";

  if (pokemonItem?.sprites?.other) {
    const { "official-artwork": link } = pokemonItem?.sprites?.other;
    myLink = link.front_default;
  }

  //pokemon bg colors
  const pkColors = [
    "#f8d5a3",
    "#f5b7b1",
    "#c39bd3",
    "#aed6f1",
    "#a3e4d7",
    "#f9e79f",
    "#fadbd8",
    "#d2b4de",
    "#a9cce3",
    "#a2d9ce",
    "#f7dc6f",
    "#f5cba7",
    "#bb8fce",
    "#85c1e9",
    "#76d7c4",
  ];

  const randomColor = pkColors[Math.floor(Math.random() * pkColors.length)];
  const handleBackgroundClick = (e) => {
    // Check if the click occurred on the wrapper element
    if (e.target.classList.contains(styles.PokemonBgWrapper)) {
      handleClose();
    }
  };

  return (
    <div id="pkc_container" className={styles.PokemonBgWrapper}>
        <div
      className={styles.PokemonBg}
      onClick={handleBackgroundClick}
      style={{
        background: !loading && randomColor
      }}
    >
      {!loading ? (
        
        pokemonItem && (
          <>
          
            <div className={styles.PokemonImage}>
              <img
                src={
                  pokemonItem?.sprites?.other?.home.front_default
                    ? pokemonItem?.sprites?.other?.home.front_default
                    : myLink
                }
                alt=""
              />
            </div>
            <div className={styles.PokemonBody}>
            <button className={styles.CloseButton} onClick={handleClose}>
           X
            </button>
              <h2 className={styles.pokemon_name}>{pokemonItem?.name}</h2>
              <div className={styles.PokemonInfo}>
             

                <div className={styles.PokemonInfoItem}>
                  <h5>Type:</h5>
                  
                  {pokemonItem?.types?.map((type) => {
                    return <p key={type.type.name}>{type.type.name},</p>;
                  })}
                </div>
                <div className={styles.PokemonInfoItem}>
                <h5>Stats:</h5>
       
              </div>
              <div>
                <PokemonStats stats={pokemonItem?.stats} />
              </div>
       

        
        
              
              </div>
            </div>
           
          </>
        )
      ) : (
        <div className="loader">
          <Loading />
        </div>
      )}
    </div> 
    </div>
 
  );
}

export default Pokemon;

