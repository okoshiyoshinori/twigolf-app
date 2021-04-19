import React from 'react'
import {Redirect,Route,RouteComponentProps,withRouter,RouteProps} from 'react-router-dom'
import {connect} from 'react-redux'
import {RootState} from '../store'

interface Props extends ReduxProps,RouteComponentProps {
  path:string,
  component:any
  auth:string
}

class PrivateRoute extends React.Component<Props,{}> {
  constructor(props:Props) {
    super(props)
  }
  render() {
    const {session} = this.props
    if (session.login) {
      return (<Route exact path={this.props.path} component={this.props.component}/>)
    } else {
      return (<Redirect to={this.props.auth}/>)
    }
  }
}


const mapStateToProps = (state:RootState) => {
  return {
    session:state.session
  }
}

type ReduxProps = ReturnType<typeof mapStateToProps>

export default connect(mapStateToProps)(withRouter(PrivateRoute)) 


