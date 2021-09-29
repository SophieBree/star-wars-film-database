
const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div>
      <form action="/" method="get" autoComplete="off">
        <label htmlFor="header-search">
          <span className="visually-hidden">Search blog posts</span>
        </label>
        <input
          value={searchQuery}
          onInput={(e) => setSearchQuery(e.target.value)}
          type="text"
          id="header-search"
          placeholder="Search blog posts"
          name="s"
        />
      </form>
      <style jsx>{`
.visually-hidden {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`}</style>
    </div>
  );
};

export default SearchBar;
