import { useState } from "react"

const SiteHeader = ({handleLogout, project}) => {
  return (
    <header className="site-header">
      <img src="/transparent-logo.png" className="site-logo" alt="Mimic Logo"></img>
      <p className="project-name">{project.name}</p>
      <p className="project-id"><span className="project-id-dots">::</span>{` ${project.id}`}</p>
      <ThemeSwitcher/>
      {/* <div className="checkbox-container">
        <input type="checkbox"></input>
        <span className="slider round"></span>
      </div> */}
      {/* <input type="checkbox" className="theme-switcher-input"></input> */}
      <button className="logout-button" onClick={handleLogout}>Log out</button>
    </header>
  )
}

const ThemeSwitcher = () => {
  const [lightTheme, setLightTheme] = useState(false)

  const toggleTheme = () => {
    const html = document.querySelector('html')
    setLightTheme(!lightTheme)

    if (lightTheme) {
      html.classList.remove("light-theme");
    } else {
      html.classList.add("light-theme");
    }
  }

  return (
    <button
      className="theme-switcher"
      onClick={toggleTheme}
    >
      {lightTheme ? '🌙' : '🌞'}
    </button>
  )
}

export default SiteHeader