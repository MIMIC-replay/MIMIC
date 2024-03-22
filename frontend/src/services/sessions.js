// import sessions from '../../mock-data/TESTsessions.json'
import axios from 'axios'

const PORT = 3001
const BASE_URL = `http://localhost:${PORT}/api/project`


let token = null // private variable to this module

export const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export const getSessions = async (projectId) => {
  // only token bearers can access???
  // use this:
  //
  const config = { headers: {
    Authorization: token
  } }

  try {
    const response = await axios.get(
      `${BASE_URL}/${projectId}`,
      config
     )

     return response.data.sessions

    // return [
    //   sessions[0], 

    //   {
    //   ...sessions[0], 
    //   id:"766ygdf-6546465d-gdfgfd-6565g5gg", 
    //   network: [
    //     {
    //       "type": 999,
    //       "data": {
    //         "url": "TEST",
    //         "type": "WebSocket",
    //         "event": "TEST",
    //         "message": "Hello, you sent -> hello world"
    //       },
    //       "timestamp": 1710364883670
    //     },
    //       {
    //         "type": 999,
    //         "data": {
    //           "url": "http://localhost:3001/api/record",
    //           "type": "FETCH",
    //           "requestMadeAt": 1710364883645,
    //           "method": "PUT",
    //           "responseReceivedAt": 1710364883670,
    //           "latency": 333,
    //           "status": 204
    //         },
    //         "timestamp": 1710364883670
    //       }
    //   ],
      
    //   events: [
    //       ...sessions[0].events, 
    //       ...sessions[0].events
    //     ],
      
    //   errors: [
    //     {
    //       "type": 1,
    //       "data": {
    //           "plugin": "rrweb/console@1",
    //           "payload": {
    //               "level": "error",
    //               "trace": [
    //                   "TEST (http://localhost:5173/src/TargetApp.jsx:144:63)",
    //                   "callCallback2 (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=0aa84f47:3674:22)",
    //                   "invokeGuardedCallbackDev (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=0aa84f47:3699:24)",
    //                   "invokeGuardedCallback (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=0aa84f47:3733:39)",
    //                   "invokeGuardedCallbackAndCatchFirstError (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=0aa84f47:3736:33)",
    //                   "executeDispatch (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=0aa84f47:7016:50)",
    //                   "processDispatchQueueItemsInOrder (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=0aa84f47:7036:30)",
    //                   "processDispatchQueue (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=0aa84f47:7045:45)",
    //                   "dispatchEventsForPlugins (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=0aa84f47:7053:31)",
    //                   "node_modules/react-dom/cjs/react-dom.development.js/dispatchEventForPluginEventSystem/< (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=0aa84f47:7177:20)",
    //                   "batchedUpdates$1 (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=0aa84f47:18909:20)",
    //                   "batchedUpdates (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=0aa84f47:3579:20)",
    //                   "dispatchEventForPluginEventSystem (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=0aa84f47:7176:25)",
    //                   "dispatchEventWithEnableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=0aa84f47:5478:46)",
    //                   "dispatchEvent (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=0aa84f47:5472:92)",
    //                   "dispatchDiscreteEvent (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=0aa84f47:5449:26)"
    //               ],
    //               "payload": [
    //                 "SECOND SESSION"
    //               ]
    //           }
    //       },
    //       "timestamp": 1710365657755
    //   },
    //     ],
    //     logs: [
    //       {
    //           "type": 757546346,
    //           "data": {
    //               "plugin": "rrweb/console@1",
    //               "payload": {
    //                   "level": "log",
    //                   "trace": [
    //                       "onChange (http://localhost:5173/src/TargetApp.jsx:139:77)",
    //                       "callCallback2 (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=0aa84f47:3674:22)",
    //                       "invokeGuardedCallbackDev (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=0aa84f47:3699:24)",
    //                       "invokeGuardedCallback (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=0aa84f47:3733:39)",
    //                       "invokeGuardedCallbackAndCatchFirstError (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=0aa84f47:3736:33)",
    //                       "executeDispatch (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=0aa84f47:7016:50)",
    //                       "processDispatchQueueItemsInOrder (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=0aa84f47:7036:30)",
    //                       "processDispatchQueue (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=0aa84f47:7045:45)",
    //                       "dispatchEventsForPlugins (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=0aa84f47:7053:31)",
    //                       "node_modules/react-dom/cjs/react-dom.development.js/dispatchEventForPluginEventSystem/< (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=0aa84f47:7177:20)",
    //                       "batchedUpdates$1 (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=0aa84f47:18909:20)",
    //                       "batchedUpdates (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=0aa84f47:3579:20)",
    //                       "dispatchEventForPluginEventSystem (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=0aa84f47:7176:25)",
    //                       "dispatchEventWithEnableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=0aa84f47:5478:46)",
    //                       "dispatchEvent (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=0aa84f47:5472:92)",
    //                       "dispatchDiscreteEvent (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=0aa84f47:5449:26)"
    //                   ],
    //                   "payload": [
    //                       "TEST"
    //                   ]
    //               }
    //           },
    //           "timestamp": 1710434986359
    //       },
    //     ]
    //   }
    // ]

  } catch (e) {
    console.error(e)
  }
}
