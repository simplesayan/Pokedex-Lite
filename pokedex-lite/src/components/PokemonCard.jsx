export default function PokemonCard({ data, onClick, fav, toggleFav }) {
    return (
        <div className="card">
            <img src={data.sprites.front_default} alt={data.name} />
            <h3>{data.name}</h3>

            <button onClick={() => toggleFav(data.id)}>
                {fav ? "★" : "☆"}
            </button>

            <button onClick={onClick}>Details</button>
        </div>
    );
}