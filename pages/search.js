const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div>
      <form action="/" method="get" autoComplete="off">
        <label htmlFor="header-search">
          <span className="visually-hidden">Search</span>
        </label>
        <input
          value={searchQuery}
          onInput={(e) => setSearchQuery(e.target.value)}
          type="text"
          id="header-search"
          placeholder="Search"
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

    }
    
    form {
      width: 350px;
      height: 40px;
      border-radius: 40px;
      box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
      background: #fff;
      padding: 0 20px 0 20px;
      transition: all 0.3s ease;
    }

    form.focus {
        box-shadow: 0 3px 40px rgba(0, 0, 0, 0.15);
    }

    input {
  font-size: 14px;
  background: none;
  color: #5a6674;
  width: 350px;
  height: 40px;
  border: none;
  appearance: none;
  outline: none;
    }

    input::placeholder {
      color: #0F0D0C
    }
`}</style>
    </div>
  );
};

export default SearchBar;
