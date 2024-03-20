import { useState } from 'react'

const LoginForm = ({ loginUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = async (event) => {
    event.preventDefault()
    const success = await loginUser(username, password)

    if (success) {
      setUsername('')
      setPassword('')
    } else setPassword('')
  }

  return (
    <div className='login-background'>
      <div className='login-container'>
        <h1 className='login-title'>M I M I C</h1>
        <form className='login-form' onSubmit={login}>
          <div>
            <input
              id='login-username-input'
              type="text"
              value={username}
              name="Username"
              placeholder='User...'
              onChange={({ target }) => setUsername(target.value)}
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
            <button type="submit">log in</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm