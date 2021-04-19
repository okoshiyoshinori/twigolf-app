import React from 'react'
import {RouteComponentProps,withRouter} from 'react-router-dom'
import {withStyles,WithStyles,createStyles} from '@material-ui/styles'
import {Box,Divider,TextField,Button,Avatar,List,colors,ListItem,CircularProgress,ListItemAvatar,ListItemText,Theme,Grid,Typography,Paper} from '@material-ui/core'
import marked from 'marked'
import {Competition} from '../store/app/types'
import CommentIcon from '@material-ui/icons/Comment'
import KeyWords from '../components/keyWord'
import Message from '../components/message'
import {RootState} from '../store'
import {connect} from 'react-redux' 
import {Dispatch} from 'redux'
import {PostComments,GetCompetition,GetParticipants,GetComments,PostPatricipant} from '../store/app/api'
import {ResetResult} from '../store/system/actions'
import Progress from '../components/progress'
import {nl2br,dataFormatwithday,dateFormat,dayEditor,ExtractionParticipants,SearchLog} from '../util/util'
import { useParams } from 'react-router-dom'
import TwitterIcon from '@material-ui/icons/Twitter'
import {PostParticipant,PostComment} from '../store/app/types'
import {Helmet} from 'react-helmet'


interface MatchParams {
  id:string
}

interface Props extends ReduxProps,RouteComponentProps<MatchParams>,WithStyles<typeof styles>{}
type State = {
  comment_str:string
  error:boolean
  helper:string
  close:boolean
  timer:ReturnType<typeof setInterval> | null
}

const styles = (theme:Theme) => createStyles({
  day: {
    color:theme.palette.primary.dark
  },
  mde: {
    '& img': {
      width:"100%",
      height:"100%",
      objectFit: 'fill'
    }
  },
  sanka:{
   '& > *': {
        margin: theme.spacing(1)
      }
  },
  button: {
    marginTop: theme.spacing(3),
    color: theme.palette.common.white,
    fontWeight:700
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4)
  },
  paper: {
    minHeight: "100px",
    padding: "15px",
    borderRadius: "10px"
  },
  label:{
   color: "black"
  },
  wrapIcon: {
    verticalAlign: 'bottom',
    display: 'inline-flex'
  },
  title: {
   '&::first-line': {
      textAlign:"center"
    }
  },
  box: {
    marginBottom:15
  }
}) 


class CompeDetail extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props)
    this.state =  {
      comment_str:"",
      error:false,
      helper:"",
      close: this.props.competition.status == 0 || dayEditor().isAfter(dayEditor(this.props.competition.event_deadline))  ? true:false,
      timer: this.props.competition.status == 0 ? null:setInterval(() => this.closeAccept(),1000)
    }
  }
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getdata(Number(id))
    this.props.getParti(Number(id))
    this.props.getComments(Number(id))
  }
  closeAccept() {
    let now = dayEditor(new Date())
    let closetime = dayEditor(this.props.competition.event_deadline)
    let endtime = dayEditor(this.props.competition.event_day)
    this.setState({
      close: now.isAfter(closetime) || now.isAfter(endtime)
    })
  }
  componentWillUnmount() {
    this.props.resetLog()
    if (this.state.timer !== null) {
      clearInterval(this.state.timer)
    }
  }
  handleParticipant(cid:number,status:number) {
    const {participants} = this.props
    let id:number 
    let result = participants.find(val => val.user_id == this.props.session.auth.id)
    if (result == undefined) {
      id = 0
    } else {
      id = result.id
    }
    this.props.postParticipant({
      id:id,
      competition_id:cid,
      user_id:this.props.session.auth.id,
      status:status,
    })
  }
  send() {
    if (this.state.comment_str == "" ) {
      this.setState({error:true,helper:"入力してください"})
      return
    }
    let data = {
      competition_id:this.props.competition.id,
      user_id:this.props.session.auth.id,
      message:this.state.comment_str
    }
    this.props.postCom(data)
  }
  componentDidUpdate(privprops:Props) {
    if (privprops.system !== this.props.system) {
      if (SearchLog(this.props.system.result,"comments").status == 200 ) {
        this.setState({
          ...this.state,
          comment_str:"",
          error:false,
          helper:""
        })
      }
    }
  }
  render() {
    const {classes,session,competition,system,participants,comments} = this.props
    const undecided:boolean = competition.event_day === null ? true:false
    const commentResult = SearchLog(system.result,"comments")
    const participantsResult = SearchLog(system.result,"participants")
    const over = competition.capacity !== null && ExtractionParticipants(1,participants).length >= competition.capacity ? true:false
    return (
      <Grid container spacing={1}>
        { system.loading.competition && <Progress/> }
        { !system.loading.competition && competition.id !== undefined &&
          <Grid item xs={12} sm={12}>
          <div className="Detail">
            <Helmet>
              <title>{competition.title}</title>
            </Helmet>
         </div>
            <Box display="flex" justifyContent="center">
             <List style={{paddingTop:0}}>
                  <ListItem style={{padding:0}} button onClick={()=>this.props.history.push("/users/" + competition.user.sns_id)}>
                   <ListItemAvatar style={{minWidth:40}}> 
                    <Avatar src={process.env.PUBLIC_URL + "/"+ competition.user.avatar} aria-label="event" className={classes.avatar}/>
                   </ListItemAvatar> 
                   <ListItemText 
                  primary={<Typography variant="caption" component="p">{competition.user.screen_name}</Typography>}
                  secondary={<Typography variant="caption">@{competition.user.sns_id}</Typography>}/>
                  </ListItem>
             </List>
            </Box>
            <Box display="flex" justifyContent="center" className={classes.box}>
              <Typography variant="h1" component="h1" dangerouslySetInnerHTML={{__html:nl2br(competition.title)}} style={{lineHeight:1.4}} > 
              </Typography>
            </Box>
               {competition.keyword !== null && 
             <Box display="flex" justifyContent="center" className={classes.box}>
                  <KeyWords keyWords={competition.keyword.split(",")}/>
            </Box>
               }
          </Grid>
        }
          <Grid item xs={12} sm={12}>
            <Paper elevation={0} variant="outlined" className={classes.paper}>
            { !system.loading.competition && competition.id !== undefined &&
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12}>
                <Typography variant="h3" style={{lineHeight:1.4}}>
                 {competition.place_text == null ? "開催場所：未定" : competition.place_text} 
                </Typography>
              </Grid>
             <Grid item xs={12} sm={12}>
                <Typography variant="h3">
                   <span> 開催日時 : {competition.event_day == null ? "未定" : dataFormatwithday(competition.event_day)} </span>
                </Typography>
              </Grid>
             {competition.event_deadline !== null &&
              <Grid item xs={12} sm={12}>
                <Typography variant="h3">
                 受付期限 : {dataFormatwithday(competition.event_deadline)} 
                </Typography>
              </Grid>
             }
              <Grid item xs={12} sm={12}>
                <Divider/>
                <div className={classes.mde} style={{lineHeight:1.6}} dangerouslySetInnerHTML={{__html:marked(competition.contents,{breaks:true})}}/>
              </Grid>
            </Grid>
            }
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Paper elevation={0} variant="outlined"  style={{border:"3px solid #6ec6ff"}} className={classes.paper}>
            { !session.login &&
            <>
              <Typography component="p" align="center" style={{fontWeight:700}}>
                このイベントに参加する場合は、まずログインをしてください
              </Typography>
              <Typography component="p" align="center" >
                <Button size="large" className={classes.button} variant="contained" disableElevation  color="primary" startIcon={<TwitterIcon/>}>
                ログイン
                </Button>
              </Typography>
              </>
            }
            {
              session.login && !this.state.close &&
              <>
               <Typography component="p" align="center" style={{fontWeight:700}}>
               {over &&
                 <span style={{color:colors.red[500]}}>このイベントは定員に達しました</span>
               }
               {!over &&
                <span>このイベントに参加しますか？</span>
               }
              </Typography>
              <Typography component="p" className={classes.sanka} align="center" style={{fontWeight:700}}>
                <Button variant="contained" disableElevation disabled={!!system.loading.participants || over} 
                onClick={() => this.handleParticipant(competition.id,1)} color="primary"  style={{color:"white",fontWeight:700}}>
                  参加する
                </Button>
                <Button variant="contained" disableElevation disabled={!!system.loading.participants}
                onClick={() => this.handleParticipant(competition.id,2)} color="secondary" style={{color:"white",fontWeight:700}}>
                  興味あり
                </Button>
                <Button variant="contained" disableElevation disabled={!!system.loading.participants}
                onClick={() => this.handleParticipant(competition.id,3)}  color="default" style={{fontWeight:700}}>
                  不参加
                </Button>
              </Typography>
              </>
            }
            { this.state.close && session.login &&
            <>
              <Typography component="p" align="center" style={{fontWeight:700}}>
                <span style={{color:colors.red[700]}}>このイベントの受付は終了しました</span>
              </Typography>
              </>
            }
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12}> 
            {participantsResult.status !== 200 && <Paper elevation={0} variant="outlined" className={classes.paper}><Message mes={participantsResult.cause}/></Paper>}
            {system.loading.participants && <Progress/>}
            {!system.loading.participants && participantsResult.status === 200 &&
            <Grid container spacing={1}>
              <Grid item xs={12} sm={4}>
                <Paper elevation={0} variant="outlined" className={classes.paper}>
                  <Typography variant="caption" style={{fontWeight:700}}>
                  参加者({ExtractionParticipants(1,participants).length}人) { competition.capacity == null || competition.capacity == 0 ? "": "/ 定員:" + competition.capacity + "人"}
                  </Typography>
                  <Divider/>
                  <List  style={{padding:"5px"}}>
                  { ExtractionParticipants(1,participants).map((data) => (
                  <ListItem style={{padding:0}} key={data.user_id}>
                   <ListItemAvatar style={{padding:0,minWidth:40}}> 
                    <Avatar  src={process.env.PUBLIC_URL + "/" + data.user.avatar} aria-label="event" className={classes.avatar}/>
                   </ListItemAvatar> 
                   <ListItemText 
                   primary={<Typography variant="caption" component="p">{data.user.screen_name}</Typography>}
                  secondary={<Typography variant="caption" component="p">@{data.user.sns_id}</Typography>}/>
                  </ListItem>
                  ))}
                </List>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper elevation={0} variant="outlined" className={classes.paper}>
                  <Typography variant="caption" style={{fontWeight:700}}>
                  興味あり({ExtractionParticipants(2,participants).length}人)
                  </Typography>
                  <Divider/>
                  <List  style={{padding:"5px"}}>
                  { ExtractionParticipants(2,participants).map((data) => (
                  <ListItem style={{padding:0}} key={data.user_id}>
                   <ListItemAvatar style={{padding:0,minWidth:40}}> 
                    <Avatar  src={process.env.PUBLIC_URL + "/" + data.user.avatar} aria-label="event" className={classes.avatar}/>
                   </ListItemAvatar> 
                   <ListItemText 
                   primary={<Typography variant="caption" component="p">{data.user.screen_name}</Typography>}
                  secondary={<Typography variant="caption" component="p">@{data.user.sns_id}</Typography>}/>
                  </ListItem>
                  ))}
                </List>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper elevation={0} variant="outlined" className={classes.paper}>
                <Typography variant="caption" style={{fontWeight:700}}>
                  不参加({ExtractionParticipants(3,participants).length}人) 
                  </Typography>
                  <Divider/>
                  <List  style={{padding:"5px"}}>
                  { ExtractionParticipants(3,participants).map((data) => (
                  <ListItem style={{padding:0}} key={data.user_id}>
                   <ListItemAvatar style={{padding:0,minWidth:40}}> 
                    <Avatar  src={process.env.PUBLIC_URL + "/" + data.user.avatar} aria-label="event" className={classes.avatar}/>
                   </ListItemAvatar> 
                   <ListItemText 
                  primary={<Typography variant="caption" component="p">{data.user.screen_name}</Typography>}
                  secondary={<Typography variant="caption" component="p">@{data.user.sns_id}</Typography>}/>
                  </ListItem>
                  ))}
                </List>
                </Paper>
              </Grid>
            </Grid>
            }
          </Grid>
          <Grid item xs={12} sm={12}>
            <Paper variant="outlined" className={classes.paper}>
            <Typography  variant="h2" className={classes.wrapIcon}>
             <CommentIcon/>コメント
            </Typography>
            {system.loading.comments && <Progress/>}
            {!system.loading.comments && commentResult.status == 200 &&
            <List>
              { comments.map((data) => (
                  <ListItem key={data.id} divider style={{padding:0}} alignItems="flex-start">
                   <ListItemAvatar style={{minWidth:40,verticalAlign:"top"}} > 
                    <Avatar src={process.env.PUBLIC_URL + "/" + data.user.avatar} aria-label="event" className={classes.avatar}/>
                   </ListItemAvatar> 
                   <ListItemText 
                  primary={<Typography variant="body2" component="p" dangerouslySetInnerHTML={{__html:nl2br(data.message)}}></Typography>}
                  secondary={<Typography variant="caption">{data.user.screen_name}・{dayEditor().to(dayEditor(data.update_at))} </Typography>}/>
                  </ListItem>
              ))}
            </List>
            }
            { session.login &&
            <>
            <TextField  fullWidth multiline required id="comment" style={{marginTop:10}} placeholder="コメント" value={this.state.comment_str}
            onChange={(e) => this.setState({comment_str:e.target.value}) }
            variant="outlined" error={this.state.error} helperText={this.state.helper} InputLabelProps={{className:classes.label}}/>
            <Button variant="contained" disableElevation disabled={!!system.loading.comments}  onClick={() => this.send()} color="primary"  style={{marginTop:20,color:"white",fontWeight:700}}>
              投稿する
            </Button>
            </>
            }
            </Paper>
          </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state:RootState) => {
  return {
    competition: state.app.competition,
    participants: state.app.participants,
    comments: state.app.comments,
    system:state.system,
    session:state.session
  }
}
const mapDispatchToProps = (dispatch:Dispatch)=>{
  return {
     getdata(id:number){
       GetCompetition(id)(dispatch)
     },
     resetLog() {
       dispatch(ResetResult())
     },
     getParti(id:number){
       GetParticipants(id)(dispatch)
     },
     getComments(id:number){
       GetComments(id)(dispatch)
     },
     postParticipant(data:PostParticipant){
       PostPatricipant(data)(dispatch)
     },
     postCom(data:PostComment) {
       PostComments(data)(dispatch)
     }
  }
}
type ReduxProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withStyles(styles,{withTheme:true})(CompeDetail)))
