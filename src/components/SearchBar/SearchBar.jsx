import css from './SearchBar.module.css';

const SearchBar = ({ onSubmit, onClearImages }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const searchTerm = e.target.elements.searchInput.value;
    onSubmit(searchTerm);
    onClearImages(); // Wyczyść wyniki po wciśnięciu przycisku "Search"
  };

  return (
    <header className={css.SearchBar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchForm_btn}>
          <span className={css.SearchForm_btn_label}>Search</span>
        </button>

        <input
          className={css.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="searchInput"
        />
      </form>
    </header>
  );
};

export default SearchBar;
