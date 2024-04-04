import json, sys

MIMIC_TEMPLATE = """
let events = [];
const projectId = "{projectId}";
const backendUrl = "{backendUrl}";

const originalFetch = window.fetch;
window.fetch = async (...args) => {{
  let [resource, config] = args;

  // Conditionally returns to avoid capture of requests sending events to our server
  if (resource === `${{backendUrl}}/api/record`) {{
    const response = await originalFetch(resource, config);
    return response;
  }}
  // Type 50 arbitrarily assigned for us to know it's a network event object in the array of event objects
  const networkEventObj = {{ type: 50 }};

  // Request Interceptor
  fetchRequestInterceptor(resource, config, networkEventObj);

  const response = await originalFetch(resource, config);

  // Response Interceptor
  fetchResponseInterceptor(response, networkEventObj);
  events.push(networkEventObj);
  return response;
}};

const fetchRequestInterceptor = (resource, config, networkEventObj) => {{
  if (resource instanceof Request) {{
    networkEventObj.data = {{
      url: resource.url,
      type: "FETCH",
      requestMadeAt: Date.now(),
      method: resource.method,
    }};
  }} else {{
    networkEventObj.data = {{
      url: resource,
      type: "FETCH",
      requestMadeAt: Date.now(),
      method: config ? (config.method ? config.method : "GET") : "GET",
    }};
  }}
}};

const fetchResponseInterceptor = (response, networkEventObj) => {{
  const currentTime = Date.now();
  networkEventObj.timestamp = currentTime;
  networkEventObj.data.responseReceivedAt = currentTime;
  networkEventObj.data.latency =
    networkEventObj.data.responseReceivedAt -
    networkEventObj.data.requestMadeAt;
  networkEventObj.data.status = response.status;
}};

// XHR interceptor begin
const originalXHROpen = window.XMLHttpRequest.prototype.open;
window.XMLHttpRequest.prototype.open = function (...args) {{
  let [method, url] = args;

  // Type 50 arbitrarily assigned for us to know it's a network event object in the array of event objects
  const networkEventObj = {{ type: 50 }};

  // Request Interceptor
  xhrRequestInterceptor(method, url, networkEventObj);

  // Response Interceptor
  this.addEventListener("load", () =>
    xhrResponseInterceptor.call(this, networkEventObj)
  );

  return originalXHROpen.apply(this, args);
}};

const xhrRequestInterceptor = (method, url, networkEventObj) => {{
  let urlString;

  if (typeof url === "string") {{
    // If the URL is already a string, use it as is
    urlString = url;
  }} else if (
    typeof url === "object" &&
    url !== null &&
    typeof url.toString === "function"
  ) {{
    // If the URL is an object with a custom toString method, use the result of toString
    urlString = url.toString();
  }} else {{
    // If the URL is neither a string nor an object with a stringifier, handle it accordingly
    console.warn("XHR request with unsupported URL format:", url);
    urlString = String(url); // Convert to string using default toString
  }}

  networkEventObj.data = {{
    url: urlString,
    type: "XHR",
    method: method,
    requestMadeAt: Date.now(),
  }};
}};

const xhrResponseInterceptor = function (networkEventObj) {{
  const currentTime = Date.now();
  // assigning timestamp at this point to ensure network event is pushed to event array in correct order related to other events
  // need to wait till response received to push the object as we need the status of the response
  networkEventObj.timestamp = currentTime;
  networkEventObj.data.responseReceivedAt = currentTime;
  networkEventObj.data.latency =
    networkEventObj.data.responseReceivedAt -
    networkEventObj.data.requestMadeAt;
  networkEventObj.data.status = this.status;

  events.push(networkEventObj);
}};

// Websocket intercepting begin
// Store a reference to the original WebSocket constructor
const OriginalWebSocket = window.WebSocket;

// Override the WebSocket constructor
window.WebSocket = function (url, protocols) {{
  // Create a new WebSocket instance
  const ws = new OriginalWebSocket(url, protocols);

  // WebSocket open event interceptor
  ws.addEventListener("open", () => {{
    const networkEventObj = {{ type: 50 }};
    // Request interceptor
    websocketOpenInterceptor(url, protocols, networkEventObj);
  }});

  // WebSocket message event interceptor
  ws.addEventListener("message", (event) => {{
    const networkEventObj = {{ type: 50 }};
    networkEventObj.data = {{ url }};
    // Response interceptor
    websocketMessageInterceptor(event, networkEventObj);
  }});

  // WebSocket close event interceptor
  ws.addEventListener("close", () => {{
    const networkEventObj = {{ type: 50 }};
    networkEventObj.data = {{ url }};
    // Close interceptor
    websocketCloseInterceptor(networkEventObj);
  }});

  // Override the send method to intercept outgoing messages
  const originalSend = ws.send;
  ws.send = function (data) {{
    const networkEventObj = {{ type: 50 }};
    networkEventObj.data = {{ url }};
    // Outgoing message interceptor
    websocketSendInterceptor(data, networkEventObj);
    originalSend.call(this, data);
  }};

  return ws;
}};

// Function to intercept WebSocket open event
const websocketOpenInterceptor = (url, protocols, networkEventObj) => {{
  networkEventObj.timestamp = Date.now();
  networkEventObj.data = {{
    ...networkEventObj.data,
    url: url,
    type: "WebSocket",
    event: "open",
  }};
  events.push(networkEventObj);
}};

// Function to intercept WebSocket message event
const websocketMessageInterceptor = (event, networkEventObj) => {{
  networkEventObj.timestamp = Date.now();
  networkEventObj.data = {{
    ...networkEventObj.data,
    type: "WebSocket",
    event: "message",
    // may need to not capture as could cause problems with larger messages
    message: event.data,
  }};
  events.push(networkEventObj);
}};

// Function to intercept WebSocket close event
const websocketCloseInterceptor = (networkEventObj) => {{
  networkEventObj.timestamp = Date.now();
  networkEventObj.data = {{
    ...networkEventObj.data,
    type: "WebSocket",
    // could add capturing of optional close parameters
    event: "close",
  }};
  events.push(networkEventObj);
}};

// Function to intercept outgoing WebSocket messages
const websocketSendInterceptor = (data, networkEventObj) => {{
  networkEventObj.timestamp = Date.now();
  networkEventObj.data = {{
    ...networkEventObj.data,
    type: "WebSocket",
    event: "send",
    // may need to remove if sending too much data
    message: data,
  }};
  events.push(networkEventObj);
}};

let stopRecording = rrweb.record({{
  emit(event) {{
    events.push(event);

    const defaultLog = console.log["__rrweb_original__"]
      ? console.log["__rrweb_original__"]
      : console.log;
  }},
  maskAllInputs: true,
  plugins: [rrweb.getRecordConsolePlugin()],
}});

const save = () => {{
  const body = JSON.stringify(events);
  events = [];

  fetch(`${{backendUrl}}/api/record`, {{
    credentials: "include",
    method: "POST",
    headers: {{
      "Content-Type": "application/json",
      "Project-ID": projectId,
    }},
    body,
  }});
}};

let saveEventsInterval = setInterval(save, 5000);

window.addEventListener("visibilitychange", (e) => {{
  if (document.visibilityState === "hidden") {{
    //When user minimizes browser, switches to a different tab, navigates to different url, closes the tab/browser
    //  stop recording, clear the interval
    //  user has 5 seconds to come back to the tab/reopen minimized window to not be assigned a new session cookie
    stopRecording();
    clearInterval(saveEventsInterval);
  }} else if (document.visibilityState === "visible") {{
    //When user reopens minimized browser, switches back to this tab
    //  initialize new recorder, reassign stopRecording, reassign the saveEventsInterval
    stopRecording = rrweb.record({{
      emit(event) {{
        events.push(event);

        const defaultLog = console.log["__rrweb_original__"]
          ? console.log["__rrweb_original__"]
          : console.log;
      }},
      maskAllInputs: true,
      plugins: [rrweb.getRecordConsolePlugin()],
    }});
    saveEventsInterval = setInterval(save, 5000);
  }}
  //save in order to capture most recent events since prior save, and refresh cookie if they only minimized browser/switched tabs for < 5s
  save();
}});
"""

# Dynamically creates a string based on the JS_TEMPLATE, filling its placeholders (between {}) 
#   with the values from the passed in json file (as a string)
def generate_script(uniqueProjectId, backendUrl):
  js_code = MIMIC_TEMPLATE.format(
    projectId = uniqueProjectId, backendUrl = backendUrl)
  return js_code

# Dynamically creates a string that mimics JS code with the values from the 
#   `config.mimic.json` file  and stores it in the js_script variable
js_script = generate_script(sys.argv[1], sys.argv[2])

# From the pseudo-JS string, this creates a real JS file, with real, functional JS code
with open('./script.mimic.js', 'w') as file:
  file.write(js_script)