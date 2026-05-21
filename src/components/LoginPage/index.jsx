import {useState} from 'react'

import {Navigate, useNavigate} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const LoginPage = () => {
  const jwtToken = Cookies.get('jwt_token')

  const navigate = useNavigate()

  const [username, setUsername] = useState('')

  const [password, setPassword] = useState('')

  const [errorMsg, setErrorMsg] = useState('')

  const onSubmitSuccess = jwtTokenValue => {
    Cookies.set('jwt_token', jwtTokenValue, {
      expires: 30,
    })

    navigate('/', {replace: true})
  }

  const onSubmitFailure = errorMessage => {
    setErrorMsg(errorMessage)
  }

  const submitForm = async event => {
    event.preventDefault()

    const userDetails = {
      username,
      password,
    }

    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)

    const data = await response.json()

    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  if (jwtToken !== undefined) {
    return <Navigate to="/" />
  }

  return (
    <div className="login-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
        alt="website login"
        className="login-image"
      />

      <form className="login-card" onSubmit={submitForm}>
        <img
          src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg"
          alt="login website logo"
          className="website-logo"
        />

        <div className="input-container">
          <label htmlFor="username">Username*</label>

          <input
            id="username"
            type="text"
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
        </div>

        <div className="input-container">
          <label htmlFor="password">Password*</label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </div>

        <button type="submit" className="login-btn">
          Login
        </button>

        {errorMsg !== '' && <p className="error-msg">{errorMsg}</p>}
      </form>
    </div>
  )
}

export default LoginPage
