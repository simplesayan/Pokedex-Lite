export default function PokemonDetail({ data, onClose }) {
    return (
        <div className="modal">
            <div className="content">
                <h2>{data.name}</h2>
                <img src={data.sprites.front_default} />

                <p>HP: {data.stats[0].base_stat}</p>
                <p>Attack: {data.stats[1].base_stat}</p>
                <p>Defense: {data.stats[2].base_stat}</p>

                <p>
                    Types: {data.types.map((t) => t.type.name).join(", ")}
                </p>

                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}