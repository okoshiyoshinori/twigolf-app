import React from 'react'
import {RouteComponentProps,withRouter} from 'react-router-dom'
import {withStyles,WithStyles,createStyles} from '@material-ui/styles'
import {Theme,Divider,Paper} from '@material-ui/core'
import {Box,Container,Button,List,ListItem,ListItemAvatar,ListItemText,Avatar,Grid,Tabs,Tab,Card,Typography} from '@material-ui/core'
import EventList from '../components/eventlist'
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
}

const styles = (theme:Theme) => createStyles({
  root: {
  },
  paper: {
    padding:"10px",
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
    this.state = this.parseQuery(this.props)
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
  handelePage(page:number) {
    this.setState({page:page})
    this.props.history.push({
      search: `?p=${page}&sort=${this.state.tabIndex}`
    })
  }
  parseQuery(props:Props):State {
    const parse = querystring.parse(props.location.search)
    return {
      tabIndex:parse.sort === undefined ? 1: Number(parse.sort),
      page:parse.p === undefined ? 1: Number(parse.p)
    }
  }
  componentWillUnmount() {
    this.props.resetLog()
  }
  componentDidUpdate(PrevProps:Props) {
    if (this.props.location.search !== PrevProps.location.search) {
      const {page,tabIndex} = this.parseQuery(this.props)
      this.setState({
        tabIndex:tabIndex,
        page:page
      })
      this.props.getUserCompetitions(this.props.match.params.snsid,page,tabIndex)
    }
  }
  render() {
    const {classes,user,competitions,system,session} = this.props
    const {tabIndex} = this.state
    const competitionsResult = SearchLog(system.result,"competitions")
    const userResult = SearchLog(system.result,"user")
    const mypage = user.sns_id == session.auth.sns_id ? true:false
    const allPage:number = Math.ceil(competitions.allNumber/Number(process.env.REACT_APP_PERNUM))
    return (
    <Grid container direction="row" justify="flex-start" spacing={2} >
      <Grid item xs={12} sm={12}>
            {userResult.status != 200 && userResult.status != 999 && <Message mes={userResult.cause}/>}
            {userResult.status == 200 && !system.loading.user &&
      <>
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
                <Avatar src={process.env.PUBLIC_URL + "/nanahara.jpg"} aria-label="event" className={classes.avatar}/>
              </ListItemAvatar> 
              <ListItemText 
                  primary={<Typography variant="body2">{user.sns_id}</Typography>}
                  secondary={<Typography variant="body2">{user.description}</Typography>}/>
              </ListItem>
          </List>
          {!mypage &&
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <TwitterFollowButton screenName={user.sns_id} />
          </Box>
          }
          {mypage &&  
          <Box display="flex" flexDirection="row" justifyContent="left" style={{marginTop:15}}>
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
            </>
        }
    </Grid>
    <Grid item xs={12} sm={12}>
     <Paper variant="outlined" className={classes.paper} style={{paddingBottom:0}}>
      <Tabs 
        value={tabIndex}
        textColor="inherit"
        variant="fullWidth"
        centered
        onChange={(e,val)=> this.handeleChange(e,val)}>
              <Tab label="今後" style={{fontSize:15}} value={1} />
              <Tab label="過去" style={{fontSize:15}} value={2} />
              <Tab label="未定" style={{fontSize:15}} value={3} />
      </Tabs>
     </Paper>
    </Grid>
   {competitionsResult.status != 200 && competitionsResult.status != 999  && <Message mes={competitionsResult.cause}/>}
   {competitionsResult.status == 200 && !system.loading.competitions &&
    <>
     <Grid item xs={12} sm={12}>
       <Paper variant="outlined">
         <EventList data={competitions.payload} session={session} />
       </Paper>
     </Grid>
     <Grid item xs={12} sm={12} md={12}>
        <Pagination shape="rounded" page={this.state.page} onChange={(e,p) => this.handelePage(p)} count={allPage} boundaryCount={5}/>
     </Grid>
     </>
   } 
    </Grid>
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
