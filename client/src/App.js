import React, { Component } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import { loadUser, logoutUser } from './store/actions/authActions'

import BasicAuth from './features/auth/BasicAuth'

class App extends Component {
  componentDidMount(){
    this.props.actions.loadUser();
  }
  render() {
    const { auth, actions } = this.props;
    return (
      <div className='App'>
        {
          auth.isLoading ?
            <p style={{textAlign: 'center'}}>"Loading..."</p>
            : ( auth.isAuthenticated ?
                <div style={{textAlign: 'center'}}>
                  <p>"Authorized"</p>
                  <button onClick={() => actions.logoutUser()}>Logout</button>
                </div>
              : <div>
                  <p style={{textAlign: 'center'}}>Build your fucking shit bro</p>
                  <BasicAuth />
                </div>
              )
            }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({loadUser, logoutUser}, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
