const express = require("express");

const sessionsRouter = express.Router();

sessionsRouter.get('/:projectId', async (req, res) => {
  // - request all session associated with a project id

  res.send(200).json({
    sessions: [
      {/*session objects */},
    ]
  })

  /*
  Session object prototype:
    {
      metadata: {
          ip:,
          location:,
          os: {name: , version: },
          browser: {name: , version: }, 
          https: boolean (if it's SSL protected or not),
          viewport:,
          date:,
          url:,
        },

      events: [],
      network: [],
      logs: [],
      errors: [],
    }
  */
  
})




module.exports = sessionsRouter