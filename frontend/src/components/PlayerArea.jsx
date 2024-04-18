import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import rrwebPlayer from "rrweb-player";

const PlayerArea = ({ session }) => {
  const [player, setPlayer] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (session.events.length < 1) return;

    (() => {
      let replayerDiv = document.getElementById("replayer");

      if (replayerDiv.firstChild) {
        replayerDiv.removeChild(replayerDiv.firstChild);
      }

      try {
        const newPlayer = new rrwebPlayer({
          target: document.getElementById("replayer"),
          props: {
            events: session.events,
            width: 1245,
            height: 304,
            // autoPlay: true,
            inactiveColor: ``,
            mouseTail: {
              strokeStyle: "#ff842d",
            },
          },
        });

        setPlayer(newPlayer);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [session]);

  const playerNavigate = async () => {
    const goToSeconds = searchParams.get("time");

    if (!goToSeconds || !player) return;

    // Toggling player state prevents replayer from starting at beginning if session was finished playing prior to navigation.
    // Prevents flickering if timestamp present in URL while searching for a different session.
    player.play();
    player.pause();

    player.goto(Math.floor(goToSeconds * 1000));
  };

  playerNavigate();

  return <div id="replayer"></div>;
};

export default PlayerArea;
