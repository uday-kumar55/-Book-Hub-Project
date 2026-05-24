import {useState} from 'react'

import {Navigate, useNavigate} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [showError, setShowError] = useState(false)

  const navigate = useNavigate()

  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken !== undefined) {
    return <Navigate to="/" />
  }

  const onSubmitSuccess = jwtTokenValue => {
    Cookies.set('jwt_token', jwtTokenValue, {
      expires: 30,
    })

    navigate('/')
  }

  const onSubmitFailure = error => {
    setShowError(true)
    setErrorMsg(error)
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

  const onClickAutoFill = () => {
    setUsername('rahul')
    setPassword('rahul@2021')
  }

  return (
    <div className="login-bg-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
        alt="website login"
        className="login-image"
      />

      <form className="login-card" onSubmit={submitForm}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/2232/2232688.png"
          alt="login website logo"
          className="login-logo"
        />

        <label className="input-label" htmlFor="username">
          USERNAME
        </label>

        <input
          type="text"
          id="username"
          className="input-field"
          placeholder="Enter username"
          value={username}
          onChange={event => setUsername(event.target.value)}
        />

        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>

        <input
          type="password"
          id="password"
          className="input-field"
          placeholder="Enter password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />

        <button type="submit" className="login-btn">
          Login
        </button>

        {showError && <p className="error-msg">*{errorMsg}</p>}

        <hr className="line" />

        <div className="demo-credentials-container">
          <div className="demo-header">
            <p className="demo-text">Demo Credentials:</p>

            <button
              type="button"
              className="auto-fill-btn"
              onClick={onClickAutoFill}
            >
              Auto-fill values
            </button>
          </div>

          <div className="credentials-box">
            <p>
              Username: <span>rahul</span>
            </p>

            <p>
              Password: <span>rahul@2021</span>
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LoginPage