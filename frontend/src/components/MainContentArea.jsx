const MainContentArea = () => {
  return (
    <section className="main-content-area">
    <header>Main content header</header>
    <div className="player">Player <div className="screen">Screen</div></div>
    <div className="player-controls">Player Controls<br></br><div className="controls"><span>⏪⏯⏩</span><span className="right-controls">📶🔁</span></div></div>
    <div className="extra-info">Extra info (Console Logs, Errors, Network)</div>
    <div className="main-right-bar">Main Right Bar</div>
  </section>
  )
}

export default MainContentArea