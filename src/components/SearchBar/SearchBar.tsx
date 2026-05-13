type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="search-bar">
      <span className="sr-only">Buscar personaje</span>
      <input
        type="search"
        value={value}
        placeholder="Buscar"
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}