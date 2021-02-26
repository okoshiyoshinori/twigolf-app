import React from 'react'
import {withRouter,RouteComponentProps,NavLink} from 'react-router-dom'
import {BottomNavigation,BottomNavigationAction,Theme} from '@material-ui/core'
import {createStyles,WithStyles,withStyles} from '@material-ui/styles'
import HomeIcon from '@material-ui/icons/Home'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import SearchIcon from '@material-ui/icons/Search'
import ImportContactsIcon from '@material-ui/icons/ImportContacts'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
interface Props extends RouteComponentProps,WithStyles<typeof styles>{}
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
  }
  render(){
    const {selected} = this.state
    const {classes} = this.props
    return (
    <div>
      <BottomNavigation  showLabels className={classes.root} value={selected} onChange={(e,val)=>this.hundleChange(e,val)}>
        <BottomNavigationAction  value={"/users/nex72"} className={classes.select} label="マイページ" key="mypage" icon={<HomeIcon />} />
        <BottomNavigationAction value={"/events"} className={classes.select} label="イベント" key="event" icon={<PeopleAltIcon />} />
        <BottomNavigationAction value={"/search"} className={classes.select} label="検索" key="search" icon={<SearchIcon />} />
        <BottomNavigationAction value={"/guid"} className={classes.select} label="ガイド" key="guide" icon={<ImportContactsIcon />} />
      </BottomNavigation>
    </div>
    )
  }
}

export default withRouter(withStyles(styles,{withTheme:true})(BottomNavi))

