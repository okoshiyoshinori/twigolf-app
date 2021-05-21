import React from 'react'
import {withRouter,RouteComponentProps} from 'react-router-dom'
import {BottomNavigation,BottomNavigationAction,Theme} from '@material-ui/core'
import {createStyles,WithStyles,withStyles} from '@material-ui/styles'
import HomeIcon from '@material-ui/icons/Home'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import SearchIcon from '@material-ui/icons/Search'
import ImportContactsIcon from '@material-ui/icons/ImportContacts'
import {Session} from '../store/session/types'
interface Props extends RouteComponentProps,WithStyles<typeof styles>{
  session:Session
}
interface State {
  selected: string
}

const styles = (theme:Theme) => createStyles({
  root: {
    width: "100%",
    position: 'fixed',
    bottom: 0,
    borderTop:"1px solid",
    borderTopColor: theme.palette.grey[300]
  },
  select: {
    color: theme.palette.grey[700]
  }
})

class BottomNavi extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props)
    this.state = {
      selected: "",
    }
  }
  componentDidMount() {
   let path:string = this.props.location.pathname
    this.setState({selected:path})
  }
  hundleChange(e:React.ChangeEvent<{}>,v:string) {
    this.props.history.push(v)
    this.setState({selected:v})
  }
  render(){
    const {selected} = this.state
    const {classes,session} = this.props
    return (
    <div>
      <BottomNavigation  showLabels={false} className={classes.root} value={selected} onChange={(e,val)=>this.hundleChange(e,val)}>
      { session.login &&
        <BottomNavigationAction showLabel={false}  value={"/users/" + session.auth.screen_name} className={classes.select} key="mypage" icon={<HomeIcon />} />
      }
        <BottomNavigationAction showLabel={false}  value={"/events"} className={classes.select} key="event" icon={<PeopleAltIcon />} />
        <BottomNavigationAction showLabel={false}  value={"/search"} className={classes.select} key="search" icon={<SearchIcon />} />
        <BottomNavigationAction showLabel={false}  value={"/guid"} className={classes.select}   key="guide" icon={<ImportContactsIcon />} />
      </BottomNavigation>
    </div>
    )
  }
}

export default withRouter(withStyles(styles,{withTheme:true})(BottomNavi))

