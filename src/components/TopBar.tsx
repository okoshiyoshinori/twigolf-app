import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import Avatar from '@material-ui/core/Avatar'
import {colors} from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import IconButton from '@material-ui/core/IconButton'
import {Theme,createStyles,withStyles,WithStyles} from '@material-ui/core/styles'
import React from 'react'
import {withRouter,RouteComponentProps} from 'react-router-dom'
import {Session} from '../store/session/types'


const styles = (theme:Theme) => createStyles({
  root: {
    display: 'flex'
  },
  grow : {
    flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar,
  appBar: {
    backgroundColor:theme.palette.common.white,
    boxShadow: "0 0 0 0"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  title: {
    padding:"10px 0px 10px 20px"
  },
  avatar: {
    width:40,
    height:40,
    padding:1,
    background:colors.grey[100],
    borderRadius: "50%",
    margin:'auto',
    '& > img': {
        borderRadius: "50%"
      }
  }
})

type State = {}

interface Props extends RouteComponentProps,WithStyles<typeof styles>{
  session:Session
  handler:Function
  loginHandler: Function
}


class TopBar extends React.Component<Props,State> {
  login() {
    this.props.loginHandler()
  }
  handleMobileToggle = () => {
    this.setState(state => ({
    }))
  }
  handleAvatarClick(){
    if (window.confirm("ログアウトしますか？")) {
      this.props.handler() 
    }
  }
  render() {
    const { classes,session } = this.props
    return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar} >
        <Toolbar>
          <Typography  className={classes.grow} >
          <a href="/">  <img alt="logo" src={`${process.env.PUBLIC_URL}/logo.png`} width="80px" style={{marginTop:5}} /> </a>
          </Typography>
          { !session.login &&
          <IconButton edge="end" color="inherit" arial-label="login" onClick={() => this.login()} size="small">
            <ExitToAppIcon/>
          </IconButton>
           }
           { session.login &&
           <IconButton onClick={()=> this.handleAvatarClick()}  size="small">
           <Avatar  src={session.auth.avatar} className={classes.avatar} />
           </IconButton>
           }
        </Toolbar>
      </AppBar>
    </div>
    )
  }
}

export default withRouter(withStyles(styles,{withTheme:true})(TopBar))
