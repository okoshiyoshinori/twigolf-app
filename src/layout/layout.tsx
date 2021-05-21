import React from 'react'
import {Route} from 'react-router-dom'
import {withRouter,RouteComponentProps,Switch} from 'react-router-dom'
import Menu from '../components/menu'
import {Box,Button,IconButton,Container,List,ListItem,ListItemText,Typography,Theme,Grid,Hidden,Snackbar,colors} from '@material-ui/core'
import {createStyles,withStyles,WithStyles} from '@material-ui/styles'
import Alert from '@material-ui/lab/Alert'
import All from '../page/all'
import Search from '../page/search'
import Guid from '../page/guid'
import Plan from '../page/plan'
import Editing from '../page/editing'
import Dm from '../page/dm'
import Config from '../page/config'
import Detail from '../page/detail'
import About from '../page/about'
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
import {TwitterLogin} from '../store/app/api'
import {ResetSnack} from '../store/system/actions'
import TwitterIcon from '@material-ui/icons/Twitter'
const {HashLink} = require('react-router-hash-link')
const {TwitterDMButton} = require("react-twitter-embed")

interface Props extends ReduxProps,RouteComponentProps,WithStyles<typeof styles>{}
type State = {}

const styles = (theme:Theme) => createStyles({
  container: {
  },
  root: {
    paddingTop: "20px",
    [theme.breakpoints.up("sm")]: {
      padding: "50px 10px 10px 10px"
    }
  },
  footer: {
    minHeight:"10.0rem",
    marginTop:theme.spacing(13),
    backgroundColor: "#3e3e3e",
    [theme.breakpoints.down("sm")]: {
      paddingBottom:theme.spacing(7),
    }
  },
  toolbar: theme.mixins.toolbar,
  menu: {
      position:"sticky",
      top: 80 
    }
})

class Layout extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props)
    this.props.getSession()
  }
  logouthandler(){
    this.props.logOut()
  }
  loginhandler() {
    this.props.login()
  }
  render() {
    const {classes,session,system} = this.props
    return (
    <div>
      <Container maxWidth={"lg"}  className={classes.container}>
        <div className={classes.toolbar}/>
        <TopBar session={session} handler={()=>this.logouthandler()} loginHandler={() => this.loginhandler()}/>
        <Grid container className={classes.root} direction="row" justify="center" spacing={4} >
          <Hidden smDown >
            <Grid  md={3} item style={{minHeight:"100vh"}} >
              <div className={classes.menu}>
                <Menu session={session}/>
              </div>
            </Grid>
          </Hidden>
          <Grid xs={12} sm={12} md={7} item style={{minHeight:"100vh"}}>
            <Switch>
              <Route exact path="/users/:screen_name" component={Plan} />
              <Route exact path="/events" component={All} />
              <Route exact path="/events/:id" component={Detail} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/guid" component={Guid} />
              <Route exact path="/dm" component={Dm} />
              <Route exact path="/combinations/:cid" component={Combinations} />
              <Route exact path="/about" component={About} />
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
     <Container style={{padding:0}}> 
      <Grid container className={classes.footer} direction="row" justify="center">
          <Grid xs={12} sm={12} md={5} item style={{padding:"25px 0px 10px 25px"}}>
            <Box>
               <img alt="logo" src={`${process.env.PUBLIC_URL}/logo_white.png`} width="90px" />
            </Box>
            <Box >
              <Typography variant="h5" style={{color:colors.common.white}}>
                イベント告知と管理をより簡単に
              </Typography>
            </Box>
            <Box mb={1}>
                <a href="https://twitter.com/AppTwigolf" target="blank" style={{color:colors.common.white}}>
                  <TwitterIcon/>
                </a>
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={5} item style={{padding:10}}>
            <Box>
              <List>
                <ListItem>
                  <ListItemText primary={
                    <HashLink to="/about#a" style={{color:colors.grey[400],textDecoration:"none"}}>About</HashLink>
                  } style={{color:colors.grey[400]}} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={<HashLink to="/about#a1" style={{color:colors.grey[400],textDecoration:"none"}}>運営者について</HashLink>
                  } style={{color:colors.grey[400]}} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={<HashLink to="/about#a2" style={{color:colors.grey[400],textDecoration:"none"}}>twitter連携について</HashLink>
                  } style={{color:colors.grey[400]}} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={<HashLink to="/about#a3" style={{color:colors.grey[400],textDecoration:"none"}}>利用規約</HashLink>
                  } style={{color:colors.grey[400]}} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={<HashLink to="/about#a5" style={{color:colors.grey[400],textDecoration:"none"}}>プライバシーポリシー</HashLink>
                  } style={{color:colors.grey[400]}} />
                </ListItem>
              </List>
            </Box>
          </Grid>
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
    login() {
      TwitterLogin()(dispatch)
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
