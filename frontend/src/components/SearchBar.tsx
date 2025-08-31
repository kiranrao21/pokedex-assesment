interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="sticky top-0 z-10 bg-white p-4 shadow flex items-center justify-center">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search Pokémon by name..."
        className="border rounded px-4 py-2 w-full max-w-md"
      />
    </div>
  );
};
