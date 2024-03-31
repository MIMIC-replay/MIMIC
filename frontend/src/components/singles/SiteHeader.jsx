const SiteHeader = ({handleLogout, project}) => {
  return (
    <header className="site-header">
      <img src="/transparent-logo.png" className="site-logo" alt="Mimic Logo"></img>
      <p className="project-name">{project.name}</p>
      <p className="project-id">{`:: ${project.id}`}</p>
      <button className="logout-button" onClick={handleLogout}>Log out</button>
    </header>
  )
}

export default SiteHeader