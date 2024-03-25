import SearchIcon from "../iconComponents/search"

const Search = ({searchSessions}) => {
  return (
    <div className="search">
      <SearchIcon/>
      <input
        className="search-input" 
        type="text" 
        placeholder="Search by session ID"
        onChange={(e) => searchSessions(e.target.value)}
      ></input>
    </div>
  )
}

export default Search