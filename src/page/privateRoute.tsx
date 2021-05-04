import React from 'react'
import {Redirect,Route,RouteComponentProps,withRouter,RouteProps} from 'react-router-dom'
import {connect} from 'react-redux'
import {RootState} from '../store'
import Progress from '../components/progress'

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
    const {session,system} = this.props
    if (!system.loading.session) {
      if (session.login) {
        return (<Route exact path={this.props.path} component={this.props.component}/>)
      } else {
        return (<Redirect to={this.props.auth}/>)
      }
    } else {
      return (<Progress/>)
    }
  }
}


const mapStateToProps = (state:RootState) => {
  return {
    session:state.session,
    system:state.system
  }
}

type ReduxProps = ReturnType<typeof mapStateToProps>

export default connect(mapStateToProps)(withRouter(PrivateRoute)) 


