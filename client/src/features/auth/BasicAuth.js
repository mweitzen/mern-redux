import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { loginUser, signupUser } from '../../store/actions/authActions'
import { clearError } from '../../store/actions/errorActions'

class AuthModal extends React.Component {
  state = {
    signup: false,
    name: '',
    email: '',
    password: '',
    message: null
  }

  componentDidUpdate(prevProps) {
    const {error} = this.props;
    if (error !== prevProps.error) {

      if (error.id === 'REGISTER_FAIL') {
          this.setState({ message: error.message })
      } else {
        this.setState({ message: null })
      }
    }
  }

  toggle = () => {
    this.setState({ signup: !this.state.signup})
    this.props.actions.clearError();
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value })
  }

  handleSubmit = e => {

    const { name, email, password } = this.state;

  // Create user object
    const newUser = {
      name,
      email,
      password
    };

    // Signup or Login
    this.state.signup ?

    // Attempt to register user
    this.props.actions.signupUser(newUser)

    // Attempt to login user
    : this.props.actions.loginUser(newUser)

  }


  render () {
    const styles = {
      login: {
        textAlign: "center",
        color: "#303030"
      }
    }
    const { signup, name, email, password, message } = this.state;
    const { error } = this.props;

    return (
      <section style={styles.login}>
        <h2>Basic Auth</h2>
        <h4>{ signup ? "Register" : "Login"}</h4>
          {
            signup ?
            <input onChange={this.handleChange.bind(this)} value={name} type="text" placeholder="Name" id="name"/>
            : null
          }
          <p>
            <input onChange={this.handleChange.bind(this)} value={email} type="text" placeholder="Email" id="email"/>
          </p>
          <p>
            <input onChange={this.handleChange.bind(this)} value={password} type="password" placeholder="Password" id="password"/>
          </p>
          {
            (error.message && (error.status !== 401)) ?
            <p>{error.message}</p>
            : null
          }
          <p style={styles.loginButtons} >
            <button id="main"  onClick={this.handleSubmit} modifier="large--cta">{signup ? "Signup" : "Login"}</button>
          </p>
          <p style={styles.loginButtons} >
            <button id="toggle" onClick={this.toggle} modifier="quiet">{signup ? "Login?" : "Signup?"}</button>
          </p>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({signupUser, loginUser, clearError}, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthModal);
