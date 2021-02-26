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
import {makeStyles,Theme,createStyles,withStyles,WithStyles,StyleRules} from '@material-ui/core/styles'
import React from 'react'
import {withRouter,RouteComponentProps} from 'react-router-dom'


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
  }
})

type State = {
  mobileOpen: boolean
}

interface Props extends RouteComponentProps,WithStyles<typeof styles>{}


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
    const { classes } = this.props
    const { mobileOpen } = this.state
    return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar} >
        <Toolbar>
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
    </div>
    )
  }
}

export default withRouter(withStyles(styles,{withTheme:true})(TopBar))
