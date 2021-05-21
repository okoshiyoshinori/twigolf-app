import React from 'react'
import {RouteComponentProps,withRouter} from 'react-router-dom'
import {Grid,Container,Theme} from '@material-ui/core'
import TopBar from '../components/TopBar'
import {Typography,Button,Box} from '@material-ui/core'
import {createStyles,withStyles,WithStyles} from '@material-ui/styles'
import TwitterIcon from '@material-ui/icons/Twitter'
import {RootState} from '../store'
import {Dispatch} from 'redux'
import {connect} from 'react-redux'
import {GetSession,LogOut} from '../store/session/api'
import {TwitterLogin} from '../store/app/api'
import {ResetSnack} from '../store/system/actions'
import {Helmet} from 'react-helmet'


interface Props extends ReduxProps,RouteComponentProps,WithStyles<typeof styles>{}
type State = {}

const styles = (theme:Theme) => createStyles({
  container: {
    height: "100vh"
  },
  root: {
    paddingTop: "100px"
  },
    button: {
    marginTop: theme.spacing(3),
    color: theme.palette.common.white,
    fontWeight:700
  },
  main: {
    [theme.breakpoints.up("sm")]: {
      borderRightColor: theme.palette.divider,
      borderRightWidth: "1px",
      borderRightStyle: "solid",
    },
  },
  margin30: {
    [theme.breakpoints.down("sm")]: {
      marginTop:30
    }
  },
  sug: {
    '& > *': {
      marginRight:theme.spacing(2),
      color:theme.palette.common.white,
      fontWeight:"bold",
    },
    [theme.breakpoints.down("xs")]: {
      textAlign:"center"
    },
    marginTop: theme.spacing(2)
  },
  subtitle: {
    fontWeight:700,
    color:"#2a2b52",
    [theme.breakpoints.up("xs")]: {
      fontSize: "1.2rem",
      textAlign:"center"
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.5rem",
      textAlign:"left"
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.7rem",
      textAlign:"left"
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.8rem",
      textAlign:"left"
    }
  },
  con: {
    color:"#2a2b52",
    [theme.breakpoints.down("sm")]: {
      textAlign:"center",
    },
      marginTop:20
  },
  toolbar: theme.mixins.toolbar,
}) 


class Top extends React.Component<Props,State> {
  constructor(props:any) {
    super(props)
    this.props.getSession()
  }
  linkTo() {
    this.props.history.push("/events")
  }
  login() {
    this.props.login()
  }
  logouthandler(){
    this.props.logOut()
  }
  render() {
    const {classes,session} = this.props
    return (
      <Container maxWidth="lg" className={classes.container} style={{backgroundColor:"#fff"}}>
        <TopBar session={session} handler={()=>this.logouthandler()} loginHandler={() => this.login()}/>
        <Grid container direction="row" justify="center" alignItems="center" spacing={2}  className={classes.root}>
          <Grid item sm={12} md={5}>
            <div className="top">
              <Helmet>
                <title>ゴルフのイベント告知と管理をより簡単に - twigolf</title>
              </Helmet>
            </div>
            <Box>
            <Typography component="p" className={classes.subtitle}  >
            イベント告知と管理をより簡単に
            </Typography>
            <Typography className={classes.con} > 
            twigolfはゴルフに関するイベント開催に便利な告知・管理支援サービスです。
            </Typography>
            </Box>
            <Box className={classes.sug}>
            <Button size="large" disableElevation  variant="contained"  color="primary" 
            onClick={() => this.props.login()} startIcon={<TwitterIcon/>}>ログイン</Button>
            <Button size="large" disableElevation  variant="contained" color="secondary" onClick={()=>{this.linkTo()}} >後で</Button>
            </Box>
          </Grid>
          <Grid item sm={12} md={5} className={classes.margin30}  >
            <img alt="picture_top" src="top_image.png" width="100%" />
          </Grid>
       </Grid>
     </Container>
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

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withStyles(styles,{withTheme:true})(Top)))
