import styles from "../styles/search.module.scss";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div>
      <form
        className={styles.searchForm}
        action="/"
        method="get"
        autoComplete="off"
      >
        <label htmlFor="header-search">
          <span className={styles.visuallyHidden}>Search</span>
        </label>
        <input
          className={styles.searchInput}
          value={searchQuery}
          onInput={(e) => setSearchQuery(e.target.value)}
          type="text"
          id="header-search"
          placeholder="Search"
          name="s"
        />
      </form>

    </div>
  );
};

export default SearchBar;
