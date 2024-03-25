import axios from "axios";

const TargetApp = () => {
  return (
    <>
      <h1 onClick={() => console.log("Hello world clicked")}>Hello world!</h1>
      <h3 onClick={() => console.log("Welcome message clicked")}>
        Welcome to my site!
      </h3>
      <input type="text" onChange={() => console.log("typed in input")}></input>
      <button onClick={() => console.error(new Error())}>Error</button>
      <button
        onClick={() =>
          fetch("https://jsonplaceholder.typicode.com/todos/1")
            .then((res) => console.log("successful fetch"))
            .catch((rej) => console.log("failure random"))
        }
      >
        FETCH
      </button>
      <button
        onClick={() => {
          const req = new XMLHttpRequest();
          req.addEventListener("load", () => console.log("successful XHR"));
          req.open("GET", "https://jsonplaceholder.typicode.com/todos/1");
          req.send();
        }}
      >
        XHR JSON Placeholder
      </button>
      <button
        onClick={() =>
          axios
            .get("https://jsonplaceholder.typicode.com/todos/1")
            .then(() => console.log("successful axios"))
        }
      >
        Axios
      </button>
    </>
  );
};

export default TargetApp;
