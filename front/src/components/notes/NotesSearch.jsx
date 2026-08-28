export default function NotesSearch({ search, onSearchChange }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Pesquisar..."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />{" "}
    </div>
  );
}
