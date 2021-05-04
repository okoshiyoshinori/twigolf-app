import React from 'react'
import {RouteComponentProps,withRouter} from 'react-router-dom'
import {withStyles,WithStyles,createStyles} from '@material-ui/styles'
import {Theme,Divider,Paper} from '@material-ui/core'
import {colors,Menu,MenuItem,Box,Container,Button,List,ListItem,ListItemAvatar,ListItemText,Avatar,Grid,Tabs,Tab,Card,Typography} from '@material-ui/core'
import EventList from '../components/eventlist'
import EventCard from '../components/EventCard'
import {User} from '../store/app/types'
import {GetUser,GetUserCompetitions} from '../store/app/api'
import Progress from '../components/progress'
import Message from '../components/message'
import {RootState} from '../store'
import {connect} from 'react-redux' 
import {Dispatch} from 'redux'
import querystring from 'query-string'
import {SearchLog} from '../util/util'
import {ResetResult} from '../store/system/actions'
import Pagination from '@material-ui/lab/Pagination'
import {Helmet} from 'react-helmet'

const {TwitterFollowButton} = require("react-twitter-embed")

interface MatchParams {
  snsid:string
}

interface Props extends ReduxType,RouteComponentProps<MatchParams>,WithStyles<typeof styles>{}

type State = {
  tabIndex:number
  page:number
  anchorEl:HTMLElement | null
}

const styles = (theme:Theme) => createStyles({
  root: {
  },
  paper: {
    padding:"15px",
    borderRadius: "10px"
  },
  link: {
    color:theme.palette.primary.dark
  },
  back: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "8px"
  },
  select :{
    fontSize: "1.0rem",
    fontWeight:700,
    color: theme.palette.grey[700]
  },
  selected: {
    color:"#0069c0"
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5)
  }
})

class Plan extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props)
    const {tabIndex,page} = this.parseQuery(this.props)
    this.state = {
      tabIndex:tabIndex,
      page:page,
      anchorEl:null
    }
  }
  componentDidMount() {
    this.props.getUserCompetitions(this.props.match.params.snsid,this.state.page,this.state.tabIndex)
    this.props.getUser(this.props.match.params.snsid)
  }
  handeleChange(e:React.ChangeEvent<{}>,val:number) {
    this.setState({tabIndex:val})
    this.props.history.push({
      search:`?p=1&sort=${val}`
    })
  }
  handleClose() {
    this.setState({
      anchorEl:null
    })
  }
  handleLink(link:string) {
    this.props.history.push(link)
  }
  handlePopUp(e:React.MouseEvent<HTMLElement>) {
    e.stopPropagation()
    this.setState({
      anchorEl:e.currentTarget
    })
  }
  handelePage(page:number) {
    this.setState({page:page})
    this.props.history.push({
      search: `?p=${page}&sort=${this.state.tabIndex}`
    })
  }
  parseQuery(props:Props):any {
    const parse = querystring.parse(props.location.search)
    return {
      tabIndex:parse.sort == undefined ? 1: Number(parse.sort),
      page:parse.p == undefined ? 1: Number(parse.p)
    }
  }
  componentWillUnmount() {
    this.props.resetLog()
  }
  componentDidUpdate(PrevProps:Props) {
    if ( this.props.location.search != PrevProps.location.search) {
      const {page,tabIndex} = this.parseQuery(this.props)
      this.setState({
        tabIndex:tabIndex,
        page:page
      })
      this.props.getUserCompetitions(this.props.match.params.snsid,page,tabIndex)
    }
    if (this.props.location.pathname != PrevProps.location.pathname ) {
      const {page,tabIndex} = this.parseQuery(this.props)
      this.setState({
        tabIndex:tabIndex,
        page:page
      })
      this.props.getUser(this.props.match.params.snsid)
      this.props.getUserCompetitions(this.props.match.params.snsid,page,tabIndex)
    }
  }
  render() {
    const {classes,user,competitions,system,session} = this.props
    const {tabIndex} = this.state
    const competitionsResult = SearchLog(system.result,"competitions")
    const userResult = SearchLog(system.result,"user")
    const mypage = user.id == session.auth.id ? true:false
    const allPage:number = Math.ceil(competitions.allNumber/Number(process.env.REACT_APP_PERNUM))
    if (userResult.status != 200 && userResult.status != 999 ) { return ( <Message mes={userResult.cause}/> )}
    return (
    <>
    <Grid container direction="row" justify="flex-start" spacing={1} >
     {userResult.status == 200 && !system.loading.user &&
     <>
      <Grid item xs={12} sm={12}>
      <div className="Plan">
        <Helmet>
         <title>{user.screen_name}さんのマイページ</title>
        </Helmet>
      </div>
        <Typography variant="h1" style={{marginBottom:"10px"}}>
          {user.screen_name}さんのマイページ 
        </Typography >
        <Paper variant="outlined" className={classes.paper} >
          <List>
            <ListItem style={{padding:0}} alignItems="flex-start">
              <ListItemAvatar style={{minWidth:50}}> 
                <Avatar src={process.env.PUBLIC_URL + "/" + user.avatar} aria-label="event" className={classes.avatar}/>
              </ListItemAvatar> 
              <ListItemText 
                  primary={<Typography variant="caption" style={{color:"#000"}}>{user.screen_name}</Typography>}
                  secondary={
                    <>
                    <Typography variant="caption" component="p" style={{color:"#000"}}>@{user.sns_id}</Typography>
                    <Typography variant="caption" component="p" style={{color:"#444"}}>{user.description}</Typography>
                    </>
                    }/>
              </ListItem>
          </List>
          {!mypage &&
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <TwitterFollowButton screenName={user.sns_id} />
          </Box>
          }
          {mypage &&  
          <Box display="flex" flexDirection="row" justifyContent="left">
            <Button variant="text" size="medium"  onClick={()=> this.props.history.push("/creation")} disableElevation  
               style={{fontWeight:700}} color="primary" >
                イベント作成
            </Button>
            <Button variant="text" size="medium"  onClick={()=> this.props.history.push("/config")} disableElevation color="primary" 
               style={{fontWeight:700}} >
               設定
            </Button>
          </Box>
          }
        </Paper>
    </Grid>
    <Grid item xs={12} sm={12} style={{marginBottom:15,marginTop:15}}>
      <Tabs style={{borderBottom:"1px solid #dcdcdc"}} 
        value={tabIndex}
        variant="standard"
        centered
        onChange={(e,val)=> this.handeleChange(e,val)}>
              <Tab label="今 後" value={1} />
              <Tab label="過 去" value={2} />
              <Tab label="未 定" value={3} />
      </Tabs>
    </Grid>
   {competitionsResult.status != 200 && competitionsResult.status != 999  && <Message mes={competitionsResult.cause}/>}
   {competitionsResult.status == 200 && !system.loading.competitions &&
    <>
    { competitions.payload.map((data) => (
     <Grid item xs={12} sm={12}>
      <EventCard data={data} session={session} handler={this.handlePopUp.bind(this)} />
     </Grid>
     ))}
     <Grid item xs={12} sm={12} md={12}>
        <Pagination shape="rounded" page={this.state.page} onChange={(e,p) => this.handelePage(p)} count={allPage} boundaryCount={5}/>
     </Grid>
     </>
    } 
    </>
   }
    </Grid>
    <Menu 
       keepMounted
       anchorEl={this.state.anchorEl}
       open={Boolean(this.state.anchorEl)}
       onClose={(e) => this.handleClose()}
       id="menu"
     >
       <MenuItem onClick={() => this.handleLink("/creation?cid=" + this.state.anchorEl?.getAttribute("data-id")) }>編集</MenuItem>
       <MenuItem onClick={() => this.handleLink("/pa_management?cid=" + this.state.anchorEl?.getAttribute("data-id")) } >参加管理</MenuItem>
       <MenuItem onClick={() => this.handleLink("/compe_management?cid=" + this.state.anchorEl?.getAttribute("data-id")) } >ペアリング</MenuItem>
    </Menu>
    </>
    )
  }
}

const mapStateToProps = (state:RootState) => {
  return {
    user:state.app.user,
    competitions:state.app.competitions,
    system:state.system,
    session: state.session
  }
}

const mapDispatchToProps = (dispatch:Dispatch) => {
  return {
    getUser(id:string){
      GetUser(id)(dispatch)
    },
    getUserCompetitions(id:string,page:number,sort:number) {
      GetUserCompetitions(id,page,sort)(dispatch)
    },
    resetLog(){
      dispatch(ResetResult())
    }
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withStyles(styles,{withTheme:true})(Plan)))
