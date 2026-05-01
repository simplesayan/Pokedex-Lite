import { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "./components/PokemonCard";
import PokemonDetail from "./components/PokemonDetails";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";
import Pagination from "./components/Pagination";
import "./App.css";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("fav")) || []
  );

  const limit = 20;

  useEffect(() => {
    fetchPokemon();
  }, [page]);

  const fetchPokemon = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${page * limit}`
      );

      const details = await Promise.all(
        res.data.results.map((p) => axios.get(p.url))
      );

      const data = details.map((d) => d.data);
      setPokemon(data);
      setFiltered(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setFiltered(
      pokemon.filter((p) =>
        p.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const handleFilter = (type) => {
    if (!type) return setFiltered(pokemon);
    setFiltered(
      pokemon.filter((p) =>
        p.types.some((t) => t.type.name === type)
      )
    );
  };

  const toggleFavorite = (id) => {
    let updated;
    if (favorites.includes(id)) {
      updated = favorites.filter((f) => f !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    localStorage.setItem("fav", JSON.stringify(updated));
  };

  return (
    <div className="container">
      <h1>Pokedex Lite</h1>

      <SearchBar onSearch={handleSearch} />
      <Filter onFilter={handleFilter} />

      {loading && <p>Loading...</p>}

      <div className="grid">
        {filtered.map((p) => (
          <PokemonCard
            key={p.id}
            data={p}
            onClick={() => setSelected(p)}
            fav={favorites.includes(p.id)}
            toggleFav={toggleFavorite}
          />
        ))}
      </div>

      <Pagination page={page} setPage={setPage} />

      {selected && (
        <PokemonDetail data={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

export default App;