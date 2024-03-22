const SiteHeader = ({handleLogout}) => {
  return (
    <header className="site-header">
      <img src="/transparent-logo.png" className="site-logo" alt="Mimic Logo"></img>
      {`Our Supercalifragilisticexpialidocious Project - 🧝‍♂️🧝‍♀️ Hi Link! 🏰🐔`}
      <button className="logout-button" onClick={handleLogout}>Log out</button>
    </header>
  )
}

export default SiteHeader