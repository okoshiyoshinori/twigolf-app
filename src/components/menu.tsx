import React from 'react'
import {Typography,Card,Theme,List,ListItem,ListItemIcon,ListItemText} from '@material-ui/core'
import {createStyles,withStyles,WithStyles} from '@material-ui/styles'
import {withRouter,RouteComponentProps,NavLink} from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import SearchIcon from '@material-ui/icons/Search'
import ImportContactsIcon from '@material-ui/icons/ImportContacts'
import {Session} from '../store/session/types'

interface Props extends RouteComponentProps,WithStyles<typeof styles>{
  session:Session
}

type State ={}


const styles = (theme:Theme) => createStyles({
  root: {
    backgroundColor: theme.palette.common.white
  },
  main: {
    backgroundColor: theme.palette.common.white
  },
  cardcontents: {
      padding: 0,
    "&:last-child": {
      paddingBottom: 0
    }
  },
  manuList: {
    padding: theme.spacing(2)
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  activeStyle: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main
  }
})

class Menu extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props)
    this.state = {
      selectedIndex:99, 
      open: true
    }
  }
  render() {
    const {classes,session} = this.props
    return (
          <Card elevation={0} variant="outlined" className={classes.main} >
            <List component="nav" style={{padding:0}}>
            { 
              session.login &&
              <ListItem button divider  component={NavLink} to={"/users/" + session.auth.screen_name} activeClassName="Mui-selected">
                <ListItemIcon>
                  <HomeIcon/>
                </ListItemIcon>
                <ListItemText primary={<Typography variant="h4" style={{fontWeight:700}}>マイページ</Typography>} />
              </ListItem>
            }
              <ListItem button divider component={NavLink} to="/events" activeClassName="Mui-selected" exact>
                <ListItemIcon>
                  <PeopleAltIcon />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="h4" style={{fontWeight:700}}>みんなのイベント</Typography>} />
              </ListItem>
              <ListItem button divider component={NavLink} to="/search" activeClassName="Mui-selected" exact>
                <ListItemIcon>
                  <SearchIcon />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="h4" style={{fontWeight:700}}>検索</Typography>} />
              </ListItem>
              <ListItem button divider component={NavLink} to="/guid" activeClassName="Mui-selected" exact>
                <ListItemIcon>
                  <ImportContactsIcon/>
                </ListItemIcon>
                <ListItemText primary={<Typography variant="h4" style={{fontWeight:700}}>使い方ガイド</Typography>}/>
              </ListItem>
            </List>
          </Card>
    )
  }
} 

export default withRouter(withStyles(styles,{withTheme:true})(Menu))
