import React from 'react'
import {Route} from 'react-router-dom'
import {withRouter,RouteComponentProps,Switch} from 'react-router-dom'
import Menu from '../components/menu'
import {Container,Theme,Grid,Hidden} from '@material-ui/core'
import {createStyles,withStyles,WithStyles} from '@material-ui/styles'
import All from '../page/all'
import Search from '../page/search'
import Guid from '../page/guid'
import Plan from '../page/plan'
import Editing from '../page/editing'
import Events from '../page/event'
import Dm from '../page/dm'
import Config from '../page/config'
import Detail from '../page/detail'
import BottomNavi from '../components/bottomNavi'
import TopBar from '../components/TopBar'
import {RootState} from '../store'
import {Dispatch} from 'redux'
import {connect} from 'react-redux'
import {GetSession,LogOut} from '../store/session/api'

interface Props extends ReduxProps,RouteComponentProps,WithStyles<typeof styles>{}
type State = {}

const styles = (theme:Theme) => createStyles({
  container: {
    [theme.breakpoints.down("sm")]: {
      marginBottom:"100px"
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
  }
  componentDidMount() {
   if (this.props.session.auth.id == undefined) {
    this.props.getSession()
   }
  }
  logouthandler(){
    this.props.logOut()
  }
  render() {
    const {classes,session} = this.props
    return (
    <div>
      <Container maxWidth={"lg"} className={classes.container}>
        <div className={classes.toolbar}/>
        <TopBar session={session} handler={()=>this.logouthandler()}/>
        <Grid container className={classes.root} direction="row" justify="flex-start" spacing={5}>
          <Hidden smDown >
            <Grid  md={3} item>
              <Menu session={session}/>
            </Grid>
          </Hidden>
          <Grid sm={12} md={7} item>
              <Route  path="/users/:snsid" component={Plan} />
              <Route  path="/myevents" component={Events} />
              <Route  path="/creation" component={Editing} />
              <Route exact path="/events" component={All} />
              <Route  path="/events/:id" component={Detail} />
              <Route  path="/search" component={Search} />
              <Route  path="/guid" component={Guid} />
              <Route  path="/dm" component={Dm} />
              <Route  path="/config" component={Config} />
          </Grid>
        </Grid>
     </Container>
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
  }
}

const mapDispatchToProps = (dispatch:Dispatch) => {
  return {
    getSession() {
      GetSession()(dispatch)
    },
    logOut() {
      LogOut()(dispatch)
    }
  }
}

type ReduxProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withStyles(styles,{withTheme:true})(Layout)))
