import React, { Component } from 'react'
import { getCookiesLoginedUser } from "../../utils/cookies"
import { fakeAuth } from "../auth/private-route"
import { createBrowserHistory } from "history"
import { removeCookiesLoginedUser } from "../../utils/cookies"
import { Link } from "react-router-dom"
import "./header.scss"
import { connect } from 'react-redux';

const history = createBrowserHistory()

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      lastLogined: "",
      hasLogined : true
    }

    this.logout = this.logout.bind(this)
  }

  componentDidMount() {
    let user = getCookiesLoginedUser()
    if (user)
      this.setState({ email: user.email, lastLogined: user.lastLogined })
  }

  logout() {

    fakeAuth.signout()
    removeCookiesLoginedUser()
    history.push("/")
    window.location.reload()
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light header">
          <Link className="navbar-brand" to="/">Pesl Admin</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto"></ul>

            {this.props.hasLogined === true || this.state.hasLogined ? (

              <div className="navbar-text">
                <i className="far fa-user"></i>
                &nbsp;
                <span>{this.state.email}</span>&nbsp;&nbsp;&nbsp;
                <i
                  className="fas fa-power-off"
                  style={{
                    'cursor': 'pointer'
                  }}
                  onClick={this.logout}></i>

              </div>
            ) : null}

          </div>
        </nav>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    hasLogined: state.loginReducer.hasLogined
  }
}

export default connect(mapStateToProps)(Header);