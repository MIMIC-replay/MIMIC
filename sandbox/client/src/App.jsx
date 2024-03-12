import { useState } from "react";
import rrwebPlayer from "rrweb-player";
import "rrweb-player/dist/style.css";

function App() {
  const [error, setError] = useState(null);
  let initialTimeStamp;
  let player;
  let playerState;

  const handleClick = async () => {
    let replayerDiv = document.getElementById("replayer");
    if (replayerDiv.firstChild) {
      replayerDiv.removeChild(replayerDiv.firstChild);
    }

    try {
      const response = await fetch("http://localhost:3001/allRecordedEvents");
      if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.status}`);
      }

      const events = await response.json();
      if (events.length === 0) {
        throw new Error("Event data is empty.");
      }

      const combinedEvents = events.reduce(
        (allEvents, currentBatch) => allEvents.concat(currentBatch),
        []
      );

      setError(null);
      initialTimeStamp = combinedEvents[0].timestamp;
      player = new rrwebPlayer({
        target: document.getElementById("replayer"),
        props: {
          events: combinedEvents,
        },
      });

      player.addEventListener(
        "ui-update-player-state",
        (payload) => (playerState = payload.payload)
      );

      const consoleEvents = extractConsoleEvents(combinedEvents);
      populateConsoleDiv(consoleEvents);

      const networkEvents = extractNetworkEvents(combinedEvents);
      populateNetworkDiv(networkEvents);
    } catch (error) {
      setError(error.message || "Error fetching events");
    }
  };

  const extractNetworkEvents = (eventsArr) => {
    return eventsArr.filter((obj) => obj.type === 50);
  };

  const populateNetworkDiv = (eventsArr) => {
    const list = document.getElementById("network-list");

    eventsArr.forEach((event) => {
      const listItem = document.createElement("li");
      // we're recording the time the response to the request was received at as event.timestamp to keep the events array in order
      //      we push the network event to the events array AFTER the response is received so we can capture all the desired data
      // we believe we should present the relative time of these network requests pertaining to when the request was made
      const relTime = relativeTime(event.data.requestMadeAt);
      listItem.textContent = `${formatTime(relTime)} | ${event.data.type} | ${
        event.data.method
      } | ${event.data.url} | Status: ${event.data.status} | Latency: ${
        event.data.latency
      }ms`;

      listItem.onclick = () => {
        if (playerState === "paused") {
          player.play(); // prevents session replay from restarting from beginning if replay was at end
          player.goto(Math.floor(relTime * 1000));
          player.pause(); // returns to paused state for UX
        } else {
          player.goto(Math.floor(relTime * 1000));
        }
      };

      list.appendChild(listItem);
    });
  };

  const extractConsoleEvents = (eventsArr) => {
    return eventsArr.filter((obj) => obj.data.plugin === "rrweb/console@1");
  };

  const populateConsoleDiv = (eventsArr) => {
    const list = document.getElementById("console-list");

    eventsArr.forEach((event) => {
      const listItem = document.createElement("li");
      const relTime = relativeTime(event.timestamp);
      listItem.textContent = `${formatTime(relTime)} | ${
        event.data.payload.payload
      }`;

      listItem.onclick = () => {
        if (playerState === "paused") {
          player.play(); // prevents session replay from restarting from beginning if replay was at end
          player.goto(Math.floor(relTime * 1000));
          player.pause(); // returns to paused state for UX
        } else {
          player.goto(Math.floor(relTime * 1000));
        }
      };

      list.appendChild(listItem);
    });
  };

  const relativeTime = (timestamp) => {
    return (timestamp - initialTimeStamp) / 1000;
  };

  // Helper function to pad the number with zeros
  const padWithZeros = (number, length) => {
    let str = "" + number;
    while (str.length < length) {
      str = "0" + str;
    }
    return str;
  };

  // Function to convert seconds to the formatted time string (mm:ss)
  const formatTime = (seconds) => {
    const roundedSeconds = Math.floor(seconds);
    const minutes = Math.floor(roundedSeconds / 60);
    const remainingSeconds = roundedSeconds % 60;

    // Pad minutes and seconds with zeros
    const paddedMinutes = padWithZeros(minutes, 2);
    const paddedSeconds = padWithZeros(remainingSeconds, 2);

    return `${paddedMinutes}:${paddedSeconds}`;
  };

  return (
    <>
      <button onClick={handleClick}>Display Session</button>
      {error && (
        <div id="error">
          <p style={{ color: "red" }}>{error}</p>
        </div>
      )}
      <div id="replayer"></div>
      <div id="console">
        <h1>Console:</h1>
        <ul id="console-list"></ul>
      </div>
      <div id="network">
        <h1>Network:</h1>
        <ul id="network-list"></ul>
      </div>
    </>
  );
}

export default App;
