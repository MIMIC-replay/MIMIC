import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({ loginUser }) => {
  const [projectName, setProjectName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  
  useEffect(() => {
    navigate('/')
  }, [navigate])

  const login = useCallback(async (event) => {
    event.preventDefault()
    const success = await loginUser(projectName, password)

    if (success) {
      setProjectName('')
      setPassword('')
    } else setPassword('')
  }, [loginUser, password, projectName])

  useEffect(() => {
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        login(event)
      }
    }

    document.addEventListener("keydown", listener)

    return () => {
      document.removeEventListener("keydown", listener)
    }
  }, [login])

  return (
    <div className='login-background'>
      <div className='login-container'>
        <h1 className='login-title'>M I M I C</h1>
        <form className='login-form' onSubmit={login}>
          <div>
            <input
              id='login-projectName-input'
              type="text"
              value={projectName}
              name="ProjectName"
              placeholder='User...'
              onChange={({ target }) => setProjectName(target.value)}
              />
          </div>
          <div>
            <input
              id='login-password-input'
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
              />
          </div>
          <div className='login-buttons'>
            <button type='submit'>log in</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm