// import { useState, useEffect } from "react"

import ExtraInfo from "./ExtraInfo"
import MainContentRightBar from "./MainContentRightBar"
import SessionContentHeader from './singles/SessionContentHeader'
import PlayerArea from "./PlayerArea"
import { useEffect, useState } from "react"
import PlayerTest from "./PlayerTest"

const MainContentArea = ({session}) => {
  // const [events, setEvents] = useState([])

  // useEffect(() => {
  //   if (!session) return 
  // }, [session])

  // useEffect()

  if (!session) return

  return (
    <section className="main-content-area">
      <SessionContentHeader session={session}/>
        
      {/* <PlayerArea session={session}/> */}
      <PlayerTest session={session}/>

      <ExtraInfo session={session}/>

      <MainContentRightBar session={session}/>
  </section>
  )
}




export default MainContentArea