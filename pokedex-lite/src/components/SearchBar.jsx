export default function SearchBar({ onSearch }) {
    return (
        <input
            type="text"
            placeholder="Search Pokémon..."
            onChange={(e) => onSearch(e.target.value)}
        />
    );
}