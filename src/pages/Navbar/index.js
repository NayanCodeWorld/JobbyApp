import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Navbar = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="nav-logo"
        />
      </Link>
      <ul className="lg-link-container">
        <li className="lg-link">
          <Link className="link" to="/">
            Home
          </Link>
        </li>
        <li className="lg-link">
          <Link className="link" to="/jobs">
            Jobs
          </Link>
        </li>
      </ul>
      <ul className="sm-link-container">
        <li className="sm-link">
          <Link to="/">
            <AiFillHome className="sm-link-icon" />
          </Link>
        </li>
        <li className="sm-link">
          <Link to="/jobs">
            <BsFillBriefcaseFill className="sm-link-icon" />
          </Link>
        </li>
        <li className="sm-link" onClick={onLogout}>
          <FiLogOut className="sm-link-icon" />
        </li>
      </ul>
      <button onClick={onLogout} type="button" className="lg-logout-btn">
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Navbar)
