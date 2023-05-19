import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    errorMessage: '',
    isError: false,
  }

  onChangeUsername = event => this.setState({username: event.target.value})

  onChangePassword = event => this.setState({password: event.target.value})

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const {username, password} = this.state
    const newUser = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(newUser),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(response)
    // console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.setState({
        isError: true,
        errorMessage: data.error_msg,
      })
    }
  }

  render() {
    const {username, password, errorMessage, isError} = this.state
    const token = Cookies.get('jwt_token')

    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-container">
        <div className="login-form-outer-container">
          <div className="login-form-card">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo"
            />
            <form className="login-form" onSubmit={this.onSubmitForm}>
              <div className="input-container">
                <label className="login-label">
                  USERNAME
                  <input
                    id="usernameId"
                    className="input"
                    type="text"
                    placeholder="Username"
                    onChange={this.onChangeUsername}
                    value={username}
                  />
                </label>
              </div>
              <div className="input-container">
                <label className="login-label">
                  PASSWORD
                  <input
                    className="input"
                    type="password"
                    placeholder="Password"
                    onChange={this.onChangePassword}
                    value={password}
                  />
                </label>
              </div>
              <button className="login-btn" type="submit">
                Login
              </button>
              {isError ? <p className="error-message">{errorMessage}</p> : ''}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginPage
