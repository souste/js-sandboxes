export default function Pagination({
  totalSpells,
  spellsPerPage,
  setCurrentPage,
}) {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalSpells / spellsPerPage); i++) {
    pages.push(i);
  }
  return (
    <div>
      {pages.map((page, index) => {
        return (
          <button key={index} onClick={() => setCurrentPage(page)}>
            {page}
          </button>
        );
      })}
    </div>
  );
}
