import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import Hidden from '@material-ui/core/Hidden'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MailIcon from '@material-ui/icons/Mail'
import MenuIcon from '@material-ui/icons/Menu'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'
import Badge from '@material-ui/core/Badge'
import NotificationsIcon from '@material-ui/icons/Notifications'
import {makeStyles,Theme,createStyles,withStyles,StyleRules} from '@material-ui/core/styles'
import React from 'react'

const drawWidth = 0 

const styles = (theme:Theme) => createStyles({
  root: {
    display: 'flex'
  },
  grow : {
    flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar,
  drawer: {
   [theme.breakpoints.up("sm")]: {
     width: drawWidth,
     flexshrink:0
   }
  },
  drawerPaper: {
    width: drawWidth
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawWidth}px)`,
      marginLeft: drawWidth
    },
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
  }
})

type State = {
  mobileOpen: boolean
}
type Props = {
  window?: () => Window
  classes: any 
  theme : Theme
} 


const container = window !== undefined ? () => window.document.body : undefined

class TopBar extends React.Component<Props,State> {
  constructor(props:any) {
    super(props)
    this.state = {
      mobileOpen: false
    }
  }
  handleMobileToggle = () => {
    this.setState(state => ({
      mobileOpen: !state.mobileOpen
    }))
  }
  render() {
    const { classes,theme } = this.props
    const { mobileOpen } = this.state
    const drawer = (
      <div>
      <div className={classes.toolbar} >
      <Typography variant="h5" className={classes.title}>
        TwiGolf
      </Typography>
      </div>
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
    )
    return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar} >
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu"
            onClick ={() => this.handleMobileToggle()}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography  className={classes.grow} >
            <img src={`${process.env.PUBLIC_URL}/twi_logo.jpeg`} />
          </Typography>
          <IconButton aria-label="notifications" color="inherit">
              <Badge badgeContent={1} color="error">
                <NotificationsIcon />
              </Badge>
          </IconButton>
          <IconButton edge="end" color="inherit" arial-label="login">
            <ExitToAppIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
      { /*
      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer 
            container= {container}
            variant= "temporary"
            anchor= {theme.direction === 'rtl' ? 'right': 'left'}
            open = {mobileOpen}
            onClose = {this.handleMobileToggle}
            classes = {{
              paper: classes.drawerPaper,
            }}
            ModalProps = {{
              keepMounted: true
            }}
          >
           {drawer}
          </Drawer>
        </Hidden>
              <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
          {drawer}
          </Drawer>
        </Hidden>
      </nav>
      */}
    </div>
    )
  }
}

export default withStyles(styles,{withTheme:true})(TopBar)
