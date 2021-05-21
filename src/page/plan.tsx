import React from 'react'
import {RouteComponentProps,withRouter} from 'react-router-dom'
import {withStyles,WithStyles,createStyles} from '@material-ui/styles'
import {Theme,Paper} from '@material-ui/core'
import {Card,CardContent,colors,IconButton,Menu,MenuItem,Box,List,ListItemSecondaryAction,ListItem,ListItemAvatar,ListItemText,Avatar,Grid,Tabs,Tab,Typography} from '@material-ui/core'
import EventCard from '../components/EventCard'
import {GetUser,GetUserCompetitions} from '../store/app/api'
import Message from '../components/message'
import {RootState} from '../store'
import {connect} from 'react-redux' 
import {Dispatch} from 'redux'
import querystring from 'query-string'
import {SearchLog} from '../util/util'
import {ResetResult} from '../store/system/actions'
import Pagination from '@material-ui/lab/Pagination'
import {Helmet} from 'react-helmet'
import config from '../config/config'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

const {TwitterFollowButton} = require("react-twitter-embed")

interface MatchParams {
  screen_name:string
}

interface Props extends ReduxType,RouteComponentProps<MatchParams>,WithStyles<typeof styles>{}

type State = {
  tabIndex:number
  page:number
  anchorEl:HTMLElement | null
  anchorUserEl:HTMLElement | null
}

const styles = (theme:Theme) => createStyles({
  root: {
  },
  paper: {
    padding:"15px",
    borderRadius: "10px"
  },
  card: {
    textAlign:"center",
  },
  contents: {
      paddingBottom:0,
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
  description: {
      display:"-webkit-box",
      boxOrient:"vertical",
      overflow:"hidden",
      color:colors.grey[900],
      lineClamp:2,
      textAlign:"left",
      paddingLeft:40,
      paddingRight:40,
      marginTop:15
  },
  avatar: {
    width:60,
    height:60,
    padding:2,
    background:"linear-gradient(to right, #8a2387, #e94057, #f27121)",
    borderRadius: "50%",
    margin:'auto',
    '& > img': {
        borderRadius: "50%"
      }
  },
  heading: {
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    marginTop: 8,
    marginBottom: 0,
  },
  subheading: {
    color: theme.palette.grey[500],
    marginBottom: '0.875em',
  }
})

class Plan extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props)
    const {tabIndex,page} = this.parseQuery(this.props)
    this.state = {
      tabIndex:tabIndex,
      page:page,
      anchorEl:null,
      anchorUserEl:null
    }
  }
  componentDidMount() {
    this.props.getUserCompetitions(this.props.match.params.screen_name,this.state.page,this.state.tabIndex)
    this.props.getUser(this.props.match.params.screen_name)
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
  handleUserClose() {
      this.setState({
        anchorUserEl:null
        })
    }
  handleLink(link:string) {
    this.props.history.push(link)
  }
  handleUserPopUp(e:React.MouseEvent<HTMLElement>) {
      this.setState({
        anchorUserEl: e.currentTarget
        })
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
      tabIndex:parse.sort === undefined ? 4: Number(parse.sort),
      page:parse.p === undefined ? 1: Number(parse.p)
    }
  }
  componentWillUnmount() {
    this.props.resetLog()
  }
  componentDidUpdate(PrevProps:Props) {
    if ( this.props.location.search !== PrevProps.location.search) {
      const {page,tabIndex} = this.parseQuery(this.props)
      this.setState({
        tabIndex:tabIndex,
        page:page
      })
      this.props.getUserCompetitions(this.props.match.params.screen_name,page,tabIndex)
    }
    if (this.props.location.pathname !== PrevProps.location.pathname ) {
      const {page,tabIndex} = this.parseQuery(this.props)
      this.setState({
        tabIndex:tabIndex,
        page:page
      })
      this.props.getUser(this.props.match.params.screen_name)
      this.props.getUserCompetitions(this.props.match.params.screen_name,page,tabIndex)
    }
  }
  render() {
    const {classes,user,competitions,system,session} = this.props
    const {tabIndex} = this.state
    const competitionsResult = SearchLog(system.result,"competitions")
    const userResult = SearchLog(system.result,"user")
    const mypage = user.id === session.auth.id ? true:false
    const allPage:number = Math.ceil(competitions.allNumber/Number(config?.pagePerNum))
    if (userResult.status !== 200 && userResult.status !== 999 ) { return ( <Message mes={userResult.cause}/> )}
    return (
    <>
    <Grid container direction="row" justify="flex-start" spacing={1} >
     {userResult.status === 200 && !system.loading.user &&
     <>
      <Grid item xs={12} sm={12}>
      <div className="Plan">
        <Helmet>
         <title>{user.screen_name}さんのマイページ</title>
        </Helmet>
      </div>
        <Paper elevation={0} variant="outlined" className={classes.paper} style={{paddingBottom:0,marginBottom:15}} > 
        <Card className={classes.card} elevation={0}>
            <CardContent className={classes.contents}>
              <Avatar className={classes.avatar} src={user.avatar}/>
              <Typography variant="h4" className={classes.heading}>
                {user.name}
              </Typography>
              <Typography variant="subtitle2" className={classes.subheading}>
                {user.screen_name}
              </Typography>
              {mypage &&
                <IconButton edge="end" size="small" aria-label="more" onClick={(e) => this.handleUserPopUp(e)}>
                  <MoreHorizIcon/>
                </IconButton>
              }
              {!mypage &&
                  <TwitterFollowButton screenName={user.screen_name} />
              }
              <Typography variant="caption" component="p" className={classes.description} >
                {user.description}
              </Typography>
            </CardContent>
        </Card>
        { /*
          <List style={{paddingTop:0,paddingBottom:0}}>
            <ListItem style={{padding:0}} alignItems="flex-start">
            { mypage &&
            <ListItemSecondaryAction>
                    <IconButton edge="end" size="small" aria-label="more" onClick={(e) => this.handleUserPopUp(e)}>
                      <MoreVertIcon />
                    </IconButton>
            </ListItemSecondaryAction>
            }
              <ListItemAvatar style={{minWidth:50}}> 
                <Avatar src={user.avatar} variant="rounded" aria-label="event" className={classes.avatar}/>
              </ListItemAvatar> 
              <ListItemText 
                  primary={<Typography variant="h4" style={{color:colors.grey[900],fontWeight:"bold"}}>{user.name}</Typography>}
                  secondary={
                    <>
                    <Typography variant="caption" component="p" style={{color:colors.grey[700]}}>@{user.screen_name}</Typography>
                    </>
                    }
                  />
              </ListItem>
          </List>
          */}
          <Tabs  
            value={tabIndex}
            variant="fullWidth"
            centered
            style={{marginTop:13}}
            onChange={(e,val)=> this.handeleChange(e,val)}>
              <Tab label="主 催" value={4} style={{fontSize:"1.2rem"}} />
              <Tab label="今 後" value={1} style={{fontSize:"1.2rem"}} />
              <Tab label="過 去" value={2} style={{fontSize:"1.2rem"}}/>
              <Tab label="未 定" value={3} style={{fontSize:"1.2rem"}}/>
          </Tabs>
        </Paper>
    </Grid>
   {competitionsResult.status !== 200 && competitionsResult.status !== 999  && <Message mes={competitionsResult.cause}/>}
   {competitionsResult.status === 200 && !system.loading.competitions &&
    <>
    { competitions.payload.map((data) => (
     <Grid item xs={12} sm={6}>
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
       <MenuItem onClick={() => this.handleLink("/dm?cid=" + this.state.anchorEl?.getAttribute("data-id")) } >DM送信</MenuItem>
    </Menu>
    <Menu 
       keepMounted
       anchorEl={this.state.anchorUserEl}
       open={Boolean(this.state.anchorUserEl)}
       onClose={(e) => this.handleUserClose()}
       id="menu2"
     >
       <MenuItem onClick={() => this.handleLink("/creation")} >イベント作成</MenuItem>
       <MenuItem onClick={() => this.handleLink("/config")} >設定</MenuItem>
       <MenuItem onClick={() => this.handleLink("/dm")} >DM送信</MenuItem>
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
