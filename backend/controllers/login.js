const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const config = require('../utils/config')
const postgres = require('../models/postgres')

loginRouter.post('/', async (request, response) => {
  const { projectName, password } = request.body

  let project
  await postgres.db.one('SELECT * FROM projects WHERE name = $1', [projectName.toLowerCase()])
            .then((r) => {
              console.log("result: ", r)
              project = r 
            })
            .catch(e => {
              console.log("Error: ", e)
                response.status(401).json({
                  error: 'invalid project name'
                })
            })

  if (!project) {
    response.send()
    return
  }

  const passwordCorrect = await bcrypt.compare(password, project['password_hash'])

  if (!passwordCorrect) {
    return response.status(401).json({
      error: 'invalid project password'
    })
  }
  
  const projectDataForToken = {
    id: project.id,
    name: project.name,
  }
  
  const token = jwt.sign(projectDataForToken, config.SECRET, { expiresIn: 60*60 })

  response
    .status(200)
    .send({ token, ...projectDataForToken })
})

module.exports = loginRouter