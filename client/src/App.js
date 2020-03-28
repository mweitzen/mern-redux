import React, { Component } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import { loadUser } from './store/actions/authActions'

import BasicAuth from './features/auth/BasicAuth'

class App extends Component {
  componentDidMount(){
    this.props.actions.loadUser();
  }
  render() {
    const { auth } = this.props;
    return (
      <div className='App'>
        {
          auth.isLoading ?
            <p style={{textAlign: 'center'}}>"Loading..."</p>
            : ( auth.isAuthenticated ?
                "Authorized"
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
  actions: bindActionCreators({loadUser}, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
