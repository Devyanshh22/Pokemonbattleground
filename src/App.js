import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPoke1, setSelectedPoke1] = useState(null);
  const [selectedPoke2, setSelectedPoke2] = useState(null);
  const [battleResult, setBattleResult] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/pokemon')
      .then(response => setPokemonList(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleBattle = () => {
    if (selectedPoke1 && selectedPoke2) {
      axios.post('http://localhost:3001/battle', {
        poke1: selectedPoke1,
        poke2: selectedPoke2,
      })
      .then(response => setBattleResult(response.data.result))
      .catch(error => console.log(error));
    } else {
      alert("Please select both Pokémon!");
    }
  };

  return (
    <div className="App">
      <h1>Pokémon Battle Simulator</h1>

      <div className="selection-container">
        <div className="pokemon-select">
          <h2>Select Pokémon 1</h2>
          <select onChange={(e) => setSelectedPoke1(pokemonList[e.target.value])}>
            <option value="">--Choose Pokémon--</option>
            {pokemonList.map((pokemon, index) => (
              <option key={index} value={index}>{pokemon.name}</option>
            ))}
          </select>
        </div>

        <div className="pokemon-select">
          <h2>Select Pokémon 2</h2>
          <select onChange={(e) => setSelectedPoke2(pokemonList[e.target.value])}>
            <option value="">--Choose Pokémon--</option>
            {pokemonList.map((pokemon, index) => (
              <option key={index} value={index}>{pokemon.name}</option>
            ))}
          </select>
        </div>
      </div>

      <button className="battle-btn" onClick={handleBattle}>Battle!</button>

      {battleResult && <h2 className="result">{battleResult}</h2>}
    </div>
  );
}

export default App;
