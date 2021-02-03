import React from 'react'
import {CardContent,Grid,Typography,Card,CardHeader,Theme,List,ListItem,Avatar,ListItemAvatar,Divider,ListItemText,Collapse} from '@material-ui/core'
import {createStyles,withStyles,WithStyles} from '@material-ui/styles'
import {ExpandLess,ExpandMore} from '@material-ui/icons/'
import {withRouter,RouteComponentProps} from 'react-router-dom'

interface Props extends RouteComponentProps,WithStyles<typeof styles>{}

type State ={
  selectedIndex: number
  open: boolean
}

interface LinkData {
  key: string
  linkTo: string
  buttonNum: number
}

const links:LinkData[] = [
  {
    key: "HOME",
    linkTo: "/",
    buttonNum: 0
  },
  {
    key: "PLAN",
    linkTo: "/home/plan",
    buttonNum: 1
  },
  {
    key: "BOOKMARK",
    linkTo: "/home/bookmark",
    buttonNum:2
  },
  {
    key: "EVENT",
    linkTo: "/home/events",
    buttonNum:3,
  },
  {
    key: "DM",
    linkTo: "/home/dm",
    buttonNum:4
  },
  {
    key: "CONFIG",
    linkTo: "/home/config",
    buttonNum:5
  },
  {
    key: "ALL",
    linkTo: "/home/all",
    buttonNum:6
  },
  {
    key: "SEARCH",
    linkTo: "/home/search",
    buttonNum:7
  },
  {
    key: "GUID",
    linkTo: "/home/guid",
    buttonNum:8
  }
] 

const getLinkTo = (key:string):string => {
  const result = links.filter((ele)=> {
    return (ele.key === key)
  })
    return result[0].linkTo
}

const getButtonNum = (key:string):number => {
  const result = links.filter((ele)=> {
    return (ele.key === key)
  })
    return result[0].buttonNum
}


const styles = (theme:Theme) => createStyles({
  root: {
    backgroundColor: theme.palette.common.white
  },
  main: {
    backgroundColor: theme.palette.common.white,
    borderRadius: "10px"
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
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  }
})

class Menu extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props)
    this.state = {
      selectedIndex: 6,
      open: false
    }
  }
  setOpen() {
    this.setState({open:!this.state.open}) 
  }
  setSelect(num:number) {
    this.setState({selectedIndex:num})
  }
  accessTo(key:string) {
    this.setSelect(getButtonNum(key))
    this.props.history.push(getLinkTo(key))
  }
  render() {
    const {classes} = this.props
    const {selectedIndex,open} = this.state
    return (
      <Grid container >
        <Grid item xs={12} sm={12}>
          <Card elevation={1} className={classes.main}>
            <CardHeader 
            title={<Typography variant="h3">
              ログイン情報
            </Typography>} />
            <Divider/>
            <CardContent className={classes.cardcontents}>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar src={process.env.PUBLIC_URL + "/nanahara.jpg"} />
                  </ListItemAvatar>
                  <ListItemText 
                  primary={<Typography variant="h3">nanahara</Typography>}
                  secondary={<Typography variant="caption">@kasu</Typography>}/>
                </ListItem>
              </List>
            </CardContent>
          </Card>
          <Card elevation={1} className={classes.main} style={{marginTop:"15px"}} >
            <List component="nav" style={{padding:0}}>
              <ListItem button onClick={()=> this.setOpen()} divider>
                <ListItemText primary={<Typography variant="h3">マイページ</Typography>}/>
                {open ?<ExpandLess />:<ExpandMore />}
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button className={classes.nested} divider selected={selectedIndex === getButtonNum("PLAN")} onClick={()=> this.setSelect(getButtonNum("PLAN"))}>
                   <ListItemText primary={<Typography variant="h3">予定</Typography>} />
                  </ListItem>
                  <ListItem button className={classes.nested} divider selected={selectedIndex === getButtonNum("BOOKMARK")} onClick={()=> this.setSelect(getButtonNum("BOOKMARK"))}>
                   <ListItemText primary={<Typography variant="h3">ブックマーク</Typography>} />
                  </ListItem>
                  <ListItem button className={classes.nested} divider selected={selectedIndex === getButtonNum("EVENT")} onClick={()=> this.setSelect(getButtonNum("EVENT"))}>
                   <ListItemText primary={<Typography variant="h3">イベント作成</Typography>} />
                  </ListItem>
                  <ListItem button className={classes.nested} divider selected={selectedIndex === getButtonNum("DM")} onClick={()=> this.setSelect(getButtonNum("DM"))}>
                   <ListItemText primary={<Typography variant="h3">DM一括送信</Typography>} />
                  </ListItem>
                  <ListItem button className={classes.nested} divider selected={selectedIndex === getButtonNum("CONFIG")} onClick={()=> this.setSelect(getButtonNum("CONFIG"))}>
                   <ListItemText primary={<Typography variant="h3">設定</Typography>} />
                  </ListItem>
                </List>
              </Collapse>
              <ListItem button selected={selectedIndex === getButtonNum("ALL")} divider onClick={()=> this.accessTo("ALL")}>
                <ListItemText primary={<Typography variant="h3">みんなのイベント</Typography>} />
              </ListItem>
              <ListItem button selected={selectedIndex === getButtonNum("SEARCH")} divider onClick={()=>this.accessTo("SEARCH") }>
                <ListItemText primary={<Typography variant="h3">検索</Typography>} />
              </ListItem>
              <ListItem button selected={selectedIndex === getButtonNum("GUID")} divider onClick={()=> this.accessTo("GUID")}>
                <ListItemText primary={<Typography variant="h3">使い方ガイド</Typography>}/>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    )
  } 
} 

export default withRouter(withStyles(styles,{withTheme:true})(Menu))
