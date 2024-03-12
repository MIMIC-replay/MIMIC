import ExtraInfo from "./ExtraInfo"

import PlayerTest from "./PlayerTest"

const MainContentArea = () => {
  return (
    <section className="main-content-area">
    <header>🔒/🔓 - Target App Url - 1200 x 800 (viewport size) - some other info??</header>

    {/* <div className="player">Player <div className="screen">Screen</div></div>
    <div className="player-controls">Player Controls<br></br>
      <div className="controls">
        <span>⏪⏯⏩</span>
          <span className="right-controls">📶🔁</span>
      </div>
    </div> */}
        
    <PlayerTest/>


    {/* <div className="extra-info">Extra info (Console Logs, Errors, Network)</div> */}


    <ExtraInfo/>
    <div className="main-right-bar">Main Right Bar</div>
  </section>
  )
}

export default MainContentArea