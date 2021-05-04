import React from 'react'
import {Route} from 'react-router-dom'
import {withRouter,RouteComponentProps,Switch} from 'react-router-dom'
import Menu from '../components/menu'
import {Container,Theme,Grid,Hidden,Snackbar,SnackbarContent} from '@material-ui/core'
import {createStyles,withStyles,WithStyles} from '@material-ui/styles'
import Alert from '@material-ui/lab/Alert'
import All from '../page/all'
import Search from '../page/search'
import Guid from '../page/guid'
import Plan from '../page/plan'
import Editing from '../page/editing'
import Events from '../page/event'
import Dm from '../page/dm'
import Config from '../page/config'
import Detail from '../page/detail'
import PaManagement from '../page/pa_management'
import CompeManagement from '../page/compe_management'
import Combinations from '../page/combinations'
import PrivateRoute from '../page/privateRoute'
import BottomNavi from '../components/bottomNavi'
import TopBar from '../components/TopBar'
import {RootState} from '../store'
import {Dispatch} from 'redux'
import {connect} from 'react-redux'
import {GetSession,LogOut} from '../store/session/api'
import {ResetSnack} from '../store/system/actions'
import {snackStatus} from '../store/system/types'

interface Props extends ReduxProps,RouteComponentProps,WithStyles<typeof styles>{}
type State = {}

const styles = (theme:Theme) => createStyles({
  container: {
    [theme.breakpoints.down("sm")]: {
      marginBottom:"100px",
    }
  },
  root: {
    paddingTop: "20px",
    [theme.breakpoints.up("sm")]: {
      padding: "50px 10px 10px 10px"
    }
  },
  toolbar: theme.mixins.toolbar
})

class Layout extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props)
    this.props.getSession()
  }
  componentDidMount() {
  // if (this.props.session.auth.id == undefined) {
    //this.props.getSession()
 //  }
  }
  logouthandler(){
    this.props.logOut()
  }
  getColor(d:snackStatus):string {
    switch (d){
      case null:
        return ""
      case "success":
        return "green"
      case "info":
        return "blue"
      case "error":
        return "red"
      case "warning":
        return "orange"
      defalt:
        return "greeen"
    }
  }
  render() {
    const {classes,session,system} = this.props
    const snackColor =  this.getColor(system.snack.status)
    return (
    <div>
      <Container maxWidth={"lg"} className={classes.container}>
        <div className={classes.toolbar}/>
        <TopBar session={session} handler={()=>this.logouthandler()}/>
        <Grid container className={classes.root} direction="row" justify="center" spacing={4} >
          <Hidden smDown >
            <Grid  md={3} item>
              <Menu session={session}/>
            </Grid>
          </Hidden>
          <Grid xs={12} sm={12} md={7} item>
            <Switch>
              <Route exact path="/users/:snsid" component={Plan} />
              <Route exact path="/events" component={All} />
              <Route exact path="/events/:id" component={Detail} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/guid" component={Guid} />
              <Route exact path="/dm" component={Dm} />
              <Route exact path="/combinations/:cid" component={Combinations} />
              <PrivateRoute  path="/config" component={Config} auth="/events" />
              <PrivateRoute  path="/creation" component={Editing} auth="/events" />
              <PrivateRoute  path="/pa_management" component={PaManagement} auth="/events" />
              <PrivateRoute  path="/compe_management" component={CompeManagement} auth="/events" />
            </Switch>
          </Grid>
          <Hidden smDown >
            <Grid  md={2} item>
            </Grid>
          </Hidden>
        </Grid>
     </Container>
     <Snackbar  open={system.snack.status !== null ? true:false} autoHideDuration={3000}
     onClose={() => this.props.resetSnack()} anchorOrigin={{horizontal: 'center',vertical:'top'}}>
     <Alert variant="filled" severity={system.snack.status !== null ? system.snack.status : "info"}>
      {system.snack.message}
      </Alert>
     </Snackbar>
     <Hidden smUp>
          <BottomNavi session={session} />
          </Hidden>
     </div>
    )
  }
}

const  mapStateToProps = (state:RootState) => {
  return  {
    session:state.session,
    system:state.system
  }
}

const mapDispatchToProps = (dispatch:Dispatch) => {
  return {
    getSession() {
      GetSession()(dispatch)
    },
    logOut() {
      LogOut()(dispatch)
    },
    resetSnack() {
      dispatch(ResetSnack())
    }
  }
}

type ReduxProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withStyles(styles,{withTheme:true})(Layout)))
