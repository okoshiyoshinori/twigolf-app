import React from 'react'
import {withRouter,RouteComponentProps} from 'react-router-dom'
import {BottomNavigation,BottomNavigationAction,Theme} from '@material-ui/core'
import {createStyles,WithStyles,withStyles} from '@material-ui/styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import EventIcon from '@material-ui/icons/Event'
import SearchIcon from '@material-ui/icons/Search'
import ImportContactsIcon from '@material-ui/icons/ImportContacts'
interface Props extends RouteComponentProps,WithStyles<typeof styles>{}
interface State {
  selected: number
}

const styles = (theme:Theme) => createStyles({
  root: {
    width: "100%",
    position: 'fixed',
    height: '80px',
    bottom: 0
  },
  select: {
    color: theme.palette.grey[500]
  }
})

class BottomNavi extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props)
    this.state = {
      selected: 0 
    }
  }
  hundleChange(e:React.ChangeEvent<{}>,v:number) {
    this.setState({selected:v})
    let link:string = "/home/all"
    switch(v) {
      case 0:
        link = "/home/all"
        break
      case 1:
        link = "/home/all"
        break
      case 2:
        link = "/home/search"
        break
      case 3:  
        link = "/home/guid"
        break
    }
    this.props.history.push(link)
  }
  render(){
    const {selected} = this.state
    const {classes} = this.props
    return (
      <BottomNavigation  showLabels className={classes.root} value={selected}  onChange={(e,val)=>this.hundleChange(e,val)}>
        <BottomNavigationAction value={0} className={classes.select} label="マイページ" key="mypage" icon={<AccountCircleIcon />} />
        <BottomNavigationAction value={1} className={classes.select} label="イベント" key="event" icon={<EventIcon />} />
        <BottomNavigationAction value={2} className={classes.select} label="検索" key="search" icon={<SearchIcon />} />
        <BottomNavigationAction value={3} className={classes.select} label="ガイド" key="guide" icon={<ImportContactsIcon />} />
      </BottomNavigation>
    )
  }
}

export default withRouter(withStyles(styles,{withTheme:true})(BottomNavi))

