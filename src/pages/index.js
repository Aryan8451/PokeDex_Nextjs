import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/context/global";
import Router from "next/router";
import PokemonCard from "@/Components/PokemonCard";
import 'bootstrap/dist/css/bootstrap.min.css';


const Home = () => {
  const [search, setSearch] = useState("");
  const [pokemonType, setPokemonType] = useState({});
  const [selectedType, setSelectedType] = useState("");
  const { allPokemonData, searchResults, next, realTimeSearch } =
    useGlobalContext();
  const pkColors = {
    normal: "#aaaa99",
    fighting: "#bb5544",
    flying: "#8899ff",
    poison: "#a59",
    ground: "#db5",
    rock: "#ba6",
    bug: "#ab2",
    ghost: "#66b",
    steel: "#aab",
    fire: "#f42",
    water: "#39f",
    grass: "#7c5",
    electric: "#fc3",
    psychic: "#f59",
    ice: "#0af",
    dragon: "#4e38e9",
    dark: "#573e31",
    fairy: "#e76de7",
    unknown: "#454545",
    shadow: "#978cae",
  };

  const handleInfiniteScroll = () => {
    try {
      const scrollHeight = document.documentElement.scrollHeight;
      const innerHeight = window.innerHeight;
      const scrollTop = document.documentElement.scrollTop;
   
      if (innerHeight + scrollTop + 1 >= scrollHeight) {
        next();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleInfiniteScroll);
    };
  }, [allPokemonData]);

  useEffect(() => {
    if (allPokemonData.length > 0) {
      realTimeSearch(search);
    }
  }, [search, allPokemonData]);

  useEffect(() => {
    if (!search && allPokemonData.length === 0) {
      // Fetch initial Pokémon data
      next();
    }
  }, [search, allPokemonData]);

  const getPokemonType = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}type`);
      const data = await res.json();
      setPokemonType(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    realTimeSearch(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    realTimeSearch(search);
  };

  const displaySearchResults = () => {
    return searchResults.map((pokemon) => (
      <div
        key={pokemon.id}
        onClick={() => {
          Router.push(`/pokemon/${pokemon.name}`);
        }}
        className="pokemon-name"
      >
        {pokemon.name}
      </div>
    ));
  };

  const filterPokemon = () => {
    const newItems = allPokemonData.filter((pokemon) => {
      if (pokemon.types && pokemon.types.length > 0) {
        return pokemon.types[0].type.name === selectedType.toString();
      }
      return false;
    });
    return newItems;
  };

  useEffect(() => {
    getPokemonType();
  }, []);

  const filteredPokemon = filterPokemon();

  return (
    <main>
      <form action="" className="search-form" onSubmit={handleSearch}>
        <div className="input-control">
          <input
            type="text"
            value={search}
            onChange={handleChange}
            placeholder="Search for a Pokemon..."
          />
          <button className="submit-btn" type="submit">
            Search
          </button>
        </div>
        <div className="custom-select">
          <label htmlFor="pokemonSelect">Select a Pokemon Type: </label>
          <select
            id="pokemonSelect"
            className="custom-select"
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Select Type </option>
            {pokemonType?.results?.map((i) => (
              <option key={i.index} value={i.name}>
                {i.name}
              </option>
            ))}
          </select>
        </div>
      </form>

      {search && searchResults.length > 0 && (
        <div className="search-results">{displaySearchResults()}</div>
      )}

      <div className="all-pokemon">
        {filteredPokemon.length > 0 ? (
          filteredPokemon.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              pkColors={pkColors}
            />
          ))
        ) : allPokemonData.length > 0 ? (
          allPokemonData.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              pkColors={pkColors}
            />
          ))
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </main>
  );
};

export default Home;
