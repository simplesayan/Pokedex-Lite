const types = ["fire", "water", "grass", "electric"];

export default function Filter({ onFilter }) {
    return (
        <select onChange={(e) => onFilter(e.target.value)}>
            <option value="">All</option>
            {types.map((t) => (
                <option key={t} value={t}>
                    {t}
                </option>
            ))}
        </select>
    );
}