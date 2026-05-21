import {Link, useNavigate} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const HeaderComponent = () => {
  const navigate = useNavigate()

  const onClickLogout = () => {
    Cookies.remove('jwt_token')

    navigate('/login')
  }

  return (
    <nav className="navbar">
      <Link to="/">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2232/2232688.png"
          alt="website logo"
          className="website-logo"
        />
      </Link>

      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li>
          <Link to="/bookshelves" className="nav-link">
            Bookshelves
          </Link>
        </li>
      </ul>

      <button
        type="button"
        className="logout-btn"
        onClick={onClickLogout}
      >
        Logout
      </button>
    </nav>
  )
}

export default HeaderComponent