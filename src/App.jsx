import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from './utils/pokemon';
import Card from './components/Card';

function App() {
  const initialURL = 'https://pokeapi.co/api/v2/pokemon/';
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      // すべてのデータ
      let res = await getAllPokemon(initialURL);
      // 細かいデータを取得
      loadPokemon(res.results);
      setNextURL(res.next);
      setPrevURL(res.previous);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    let pokeData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(pokeData);
  };
  
  const prevPage = async () => {
    if (!prevURL) return;
    setLoading(true);
    let data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  }

  const nextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  }

  return (
    <div className="App">
      {loading ? <h1>ロード中です</h1> 
      : (
        <>
        <div className='pokeoncardcontainer'>
          {pokemonData.map((pokemon, i) => (
            <Card key={i} pokemon={pokemon} />
          ))}
        </div>
        <button onClick={prevPage}>前へ</button>
        <button onClick={nextPage}>次へ</button>
        </>
      )}
    </div>
  );
}

export default App;
