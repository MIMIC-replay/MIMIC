const Search = ({searchSessions}) => {

  /*
  react input style
  on input change, display value, filter by session names
  */


  return (
    <div className="search">
      <input 
        type="text" 
        placeholder="search"
        onChange={(e) => console.log(e.target.value)}
      ></input>
      <button>Search</button>
    </div>
  )
}

export default Search