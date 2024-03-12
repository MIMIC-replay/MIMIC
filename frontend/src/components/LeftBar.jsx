const LeftBar = () => {
  return (
    <nav className="left-bar">
    <div className="search">
      <input type="text" name="" id="" placeholder="search"></input>
      <button>Search</button>
    </div>
    <div className="sessions-container">
      <ul className="sessions-list">
        <li>Session A</li>
        <li>Session B</li>
        <li>Session C</li>
      </ul>
    </div>
  </nav>
  )
}

export default LeftBar