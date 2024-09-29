const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const pokemonList = [
  { name: 'Pikachu', type: 'Electric', attack: 55, defense: 40, speed: 90, hp: 35, special_attack: 50, special_defense: 50 },
  { name: 'Charizard', type: 'Fire', attack: 84, defense: 78, speed: 100, hp: 78, special_attack: 109, special_defense: 85 },
  { name: 'Bulbasaur', type: 'Grass', attack: 49, defense: 49, speed: 45, hp: 45, special_attack: 65, special_defense: 65 },
  { name: 'Squirtle', type: 'Water', attack: 48, defense: 65, speed: 43, hp: 44, special_attack: 50, special_defense: 64 },
  { name: 'Jigglypuff', type: 'Fairy', attack: 45, defense: 20, speed: 20, hp: 115, special_attack: 45, special_defense: 25 },
  { name: 'Gengar', type: 'Ghost', attack: 65, defense: 60, speed: 110, hp: 60, special_attack: 130, special_defense: 75 },
  { name: 'Onix', type: 'Rock', attack: 45, defense: 160, speed: 70, hp: 35, special_attack: 30, special_defense: 45 },
  { name: 'Mewtwo', type: 'Psychic', attack: 110, defense: 90, speed: 130, hp: 106, special_attack: 154, special_defense: 90 },
  { name: 'Snorlax', type: 'Normal', attack: 110, defense: 65, speed: 30, hp: 160, special_attack: 65, special_defense: 110 },
  { name: 'Dragonite', type: 'Dragon', attack: 134, defense: 95, speed: 80, hp: 91, special_attack: 100, special_defense: 100 },
  { name: 'Eevee', type: 'Normal', attack: 55, defense: 50, speed: 55, hp: 55, special_attack: 45, special_defense: 65 },
  { name: 'Lapras', type: 'Water', attack: 85, defense: 80, speed: 60, hp: 130, special_attack: 85, special_defense: 95 },
  { name: 'Machamp', type: 'Fighting', attack: 130, defense: 80, speed: 55, hp: 90, special_attack: 65, special_defense: 85 },
  { name: 'Gyarados', type: 'Water', attack: 125, defense: 79, speed: 81, hp: 95, special_attack: 60, special_defense: 100 },
  { name: 'Alakazam', type: 'Psychic', attack: 50, defense: 45, speed: 120, hp: 55, special_attack: 135, special_defense: 95 }
];

const typeEffectiveness = {
  Electric: { Water: 2, Ground: 0, Electric: 0.5 },
  Fire: { Grass: 2, Water: 0.5, Fire: 0.5, Electric: 1 },
  Grass: { Water: 2, Fire: 0.5, Grass: 0.5, Rock: 2 },
  Water: { Fire: 2, Grass: 0.5, Water: 0.5, Rock: 2 },
  Fairy: { Fighting: 2, Dragon: 2, Dark: 2, Fire: 0.5, Poison: 0.5, Steel: 0.5 },
  Ghost: { Ghost: 2, Psychic: 2, Dark: 0.5, Normal: 0 },
  Rock: { Fire: 2, Ice: 2, Flying: 2, Bug: 2, Fighting: 0.5, Ground: 0.5, Steel: 0.5 },
  Psychic: { Fighting: 2, Poison: 2, Psychic: 0.5, Steel: 0.5 },
  Normal: { Rock: 0.5, Ghost: 0, Steel: 0.5 },
  Fighting: { Normal: 2, Rock: 2, Steel: 2, Ice: 2, Dark: 2, Flying: 0.5, Poison: 0.5, Psychic: 0.5, Bug: 0.5, Fairy: 0.5 },
  Dragon: { Dragon: 2, Steel: 0.5, Fairy: 0 },
  Dark: { Ghost: 2, Psychic: 2, Fighting: 0.5, Dark: 0.5, Fairy: 0.5 }
};

const calculateBattle = (poke1, poke2) => {
  const typeMultiplier = typeEffectiveness[poke1.type] && typeEffectiveness[poke1.type][poke2.type] ? typeEffectiveness[poke1.type][poke2.type] : 1;
  const poke1Power = (poke1.attack * typeMultiplier) - poke2.defense;
  const typeMultiplier2 = typeEffectiveness[poke2.type] && typeEffectiveness[poke2.type][poke1.type] ? typeEffectiveness[poke2.type][poke1.type] : 1;
  const poke2Power = (poke2.attack * typeMultiplier2) - poke1.defense;

  if (poke1Power > poke2Power) {
    return `${poke1.name} wins!`;
  } else if (poke2Power > poke1Power) {
    return `${poke2.name} wins!`;
  } else {
    return 'It\'s a tie!';
  }
};

app.get('/pokemon', (req, res) => {
  res.json(pokemonList);
});

app.post('/battle', (req, res) => {
  const { poke1, poke2 } = req.body;
  const result = calculateBattle(poke1, poke2);
  res.json({ result });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
