import React, { Component } from 'react'
import "./login.scss"
import { getCookiesLoginedUser } from "../../utils/cookies"
import { Redirect } from 'react-router-dom'
import { LoginHeader } from './loginHeader';
import { Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { login } from "../../store/action/login.action"

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      redirectToReferrer: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {

    let user = getCookiesLoginedUser()
    if (user)
      this.props.history.push("/module/dashboard")

  }

  handleSubmit = async e => {

    e.preventDefault();

    let reqBody = {
      email: this.state.email,
      password: this.state.password
    }
    const { dispatch } = this.props
    dispatch(login(reqBody))
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {

    const { from } = this.props.location.state || {
      from: {
        pathname: '/module/dashboard'
      }
    }
    const { redirectToReferrer } = this.props

    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }

    console.log("Props")
    console.log(this.props)

    return (
      <div>
        <LoginHeader />
        <div className="card  w-25 mx-auto my-5">
          <div className="card-header text-center">
            <span className="login-header">Login</span>
          </div>
          <div className="card-body">

            {this.props.hasError && (
              <div className="alert alert-danger text-center" role="alert">
                <strong>Invalid Credential.</strong>
              </div>
            )}

            <form onSubmit={this.handleSubmit} noValidate>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      name="email"
                      value={this.state.email}
                      className="form-control form-control-sm"
                      placeholder="Enter email"
                      onChange={this.handleChange} />

                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={this.state.password}
                      className="form-control form-control-sm"
                      placeholder="Enter password"
                      onChange={this.handleChange} />

                  </div>
                </div>
                <div className="col-md-12">
                  <button
                    type="submit"
                    className="btn btn-success w-100"
                    disabled={this.state.spinner}>
                    {this.props.isLogging === false && (
                      <span>Login</span>
                    )}
                    {this.props.isLogging && (<Spinner size="sm" color="light" />)}
                  </button>
                </div>
                <div className="col-md-12 text-center pt-3">
                  <a href="_blank">Forgot password ?</a>
                  <i className="far fa-flushed"></i>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {

  console.log("mapStateToProps")
  console.log(state)

  return {
    hasLogined: state.loginReducer.hasLogined,
    isLogging: state.loginReducer.isLogging,
    hasError: state.loginReducer.hasError,
    loginData: state.loginReducer.loginData,
    redirectToReferrer: state.loginReducer.redirectToReferrer
  }
}

export default connect(mapStateToProps)(Login)