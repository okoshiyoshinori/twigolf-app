import React from 'react'
import {RouteComponentProps,withRouter} from 'react-router-dom'
import {withStyles,WithStyles,createStyles} from '@material-ui/styles'
import {Theme,Divider,Paper} from '@material-ui/core'
import {Container,Button,List,ListItem,ListItemAvatar,ListItemText,Avatar,Grid,Tabs,Tab,Card,Typography} from '@material-ui/core'
import EventList from '../components/eventlist'
import {User} from '../store/app/types'
import {GetUser,GetUserCompetitions} from '../store/app/api'
import Progress from '../components/progress'
import Message from '../components/message'
import {RootState} from '../store'
import {connect} from 'react-redux' 
import {Dispatch} from 'redux'
import {ResetResult} from '../store/system/actions'
import querystring from 'query-string'
import {SearchLog} from '../util/util'

interface MatchParams {
  snsid:string
}

interface Props extends ReduxType,RouteComponentProps<MatchParams>,WithStyles<typeof styles>{}

type State = {
  tabindex:number
  page:number
}

const styles = (theme:Theme) => createStyles({
  root: {
  },
  paper: {
    padding:"15px",
    paddingBottom:0,
    borderRadius: "10px"
  },
  container: {
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
    this.state = this.parssQuery(this.props)
  }
  componentDidMount() {
    this.props.resetLog()
    this.props.getUserCompetitions(this.props.match.params.snsid,this.state.page,this.state.tabindex)
    this.props.getUser(this.props.match.params.snsid)
  }
  handeleChange(e:React.ChangeEvent<{}>,val:number) {
    this.setState({tabindex:val})
    this.props.history.push({
      search:`?p=1&sort=${val}`
    })
  }
  parssQuery(props:Props):State {
    const parse = querystring.parse(props.location.search)
    return {
      tabindex:parse.sort === undefined ? 1: Number(parse.sort),
      page:parse.p === undefined ? 1: Number(parse.p)
    }
  }
  componentWillUnmount() {
    this.props.resetLog()
  }
  componentDidUpdate(PrevProps:Props) {
    if (this.props.location.search !== PrevProps.location.search) {
      this.props.resetLog()
      const {page,tabindex} = this.parssQuery(this.props)
      this.setState({
        tabindex:tabindex,
        page:page
      })
      this.props.getUserCompetitions(this.props.match.params.snsid,page,tabindex)
    }
  }
  render() {
    const {classes,user,competitions,system} = this.props
    const {tabindex} = this.state
    const competitionsResult = SearchLog(system.result,"competitions")
    return (
    <Grid container direction="row" justify="flex-start" >
     <Grid item xs={12} sm={12}>
     <Typography variant="h1" style={{marginBottom:"10px"}}>
       {user.screen_name} さんのマイページ 
      </Typography >
      <Paper variant="outlined" className={classes.paper} >
      <List>
                  <ListItem style={{padding:0}} alignItems="flex-start">
                   <ListItemAvatar style={{minWidth:50}}> 
                    <Avatar src={process.env.PUBLIC_URL + "/nanahara.jpg"} aria-label="event" className={classes.avatar}/>
                   </ListItemAvatar> 
                   <ListItemText 
                  primary={<Typography variant="h3">{user.sns_id}</Typography>}
                  secondary={<Typography variant="body2">{user.description}</Typography>}/>
                  </ListItem>
      </List>
      <Button variant="contained" onClick={()=> this.props.history.push("/creation")} disableElevation color="primary" style={{color:"#fff",fontWeight:700}} >
      イベント作成
      </Button>
                 <Tabs 
              value={tabindex}
              textColor="inherit"
              variant="standard"
              centered
              onChange={(e,val)=> this.handeleChange(e,val)}
            >
              <Tab label="今後" value={1} />
              <Tab label="過去" value={2} />
              <Tab label="未定" value={3} />
            </Tabs>
            </Paper>
            <Grid item xs={12} sm={12} style={{marginTop:20}}>
            <Paper variant="outlined">
            {system.loading.competitions === true && <Progress/>}
            {competitionsResult.status !== 200 && <Message mes={competitionsResult.cause}/>  }
            { competitionsResult.status === 200 && 
                <EventList data={competitions.payload} editable={false} />
                }
            </Paper>
            </Grid>
     </Grid>
    </Grid>
    )
  }
}

const mapStateToProps = (state:RootState) => {
  return {
    user:state.app.user,
    competitions:state.app.competitions,
    system:state.system
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
    resetLog() {
      dispatch(ResetResult())
    }
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withStyles(styles,{withTheme:true})(Plan)))
