const Search = ({searchSessions}) => {

  /*
  react input style
  on input change, display value, filter by session names
  */




  return (
    <div className="search">
      <input 
        type="text" 
        placeholder="Search by session ID"
        onChange={(e) => searchSessions(e.target.value)}
      ></input>
    </div>
  )
}

export default Search