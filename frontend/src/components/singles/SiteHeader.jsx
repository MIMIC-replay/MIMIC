import { useState } from "react"

import { shorten } from "../../helpers/dataFormatters"

const SiteHeader = ({handleLogout, project}) => {
  return (
    <header className="site-header">
      <img src="/transparent-logo.png" className="site-logo" alt="Mimic Logo"></img>
      <p className="project-name">{project.name}</p>
      <p className="project-id"><span className="project-id-dots">::</span>{` ${shorten(project.id)}`}</p>
      <ThemeSwitcher/>
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
  
      <div className="switch svelte-9brlez">
        <span className="label svelte-9brlez">{lightTheme ? '☾' : '☀'}</span>
        <input type="checkbox" id="switch-theme" className="svelte-9brlez" onChange={toggleTheme}></input> 
        <label htmlFor="switch-theme" className="svelte-9brlez"></label> 
      </div>
  )
}

export default SiteHeader