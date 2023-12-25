// PokemonStats.js
import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import styles from "@/styles/Pokemon.module.css";
const getColorVariant = (baseStat) => {
  if (baseStat >= 100) {
    return 'danger'; // green
  } else if (baseStat >= 50) {
    return 'warning'; // yellow
  } else {
    return 'success'; // red
  }
};
const PokemonStats = ({ stats }) => {
  return (
  <>

      {stats && Array.isArray(stats) && stats.map((stat) => (
        <div className={styles.statsBar} key={stat.stat.name}>
          <h6 className={styles.statName}>{stat.stat.name} :  {stat.base_stat}</h6>
          <ProgressBar className={styles.progBar}  variant={getColorVariant(stat.base_stat)} now={stat.base_stat} max={200} />
        </div>
      ))}
     </>
  );
};

export default PokemonStats;
