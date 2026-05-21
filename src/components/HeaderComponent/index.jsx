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
    <nav className="header-container">
      <Link to="/" className="link-item">
        <h1 className="logo-heading">BOOKHUB</h1>
      </Link>

      <ul className="nav-menu">
        <li>
          <Link to="/" className="link-item">
            Home
          </Link>
        </li>

        <li>
          <Link to="/bookshelves" className="link-item">
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