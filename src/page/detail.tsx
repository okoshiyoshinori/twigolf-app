import React from 'react'
import {RouteComponentProps,withRouter} from 'react-router-dom'
import {withStyles,WithStyles,createStyles,} from '@material-ui/styles'
import {Divider,Avatar,List,ListItem,CircularProgress,ListItemAvatar,ListItemText,Theme,Grid,Typography,Paper} from '@material-ui/core'
import marked from 'marked'
import {Competition} from '../store/app/types'
import CommentIcon from '@material-ui/icons/Comment'
import KeyWords from '../components/keyWord'
import Message from '../components/message'
import {RootState} from '../store'
import {connect} from 'react-redux' 
import {Dispatch} from 'redux'
import {GetCompetition,GetParticipants,GetComments} from '../store/app/api'
import {ResetResult} from '../store/system/actions'
import Progress from '../components/progress'
import {dataFormatwithday,dateFormat,ExtractionParticipants,SearchLog} from '../util/util'
import { useParams } from 'react-router-dom'

interface MatchParams {
  id:string
}

interface Props extends ReduxProps,RouteComponentProps<MatchParams>,WithStyles<typeof styles>{}
type State = {
  detail:Competition
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
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4)
  },
  paper: {
    minHeight: "100px",
    padding: "15px",
    borderRadius: "10px"
  },
  wrapIcon: {
    verticalAlign: 'bottom',
    display: 'inline-flex'
   }
}) 


class CompeDetail extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props)
  }
  componentDidMount() {
    this.props.resetLog()
    const id = this.props.match.params.id
    this.props.getdata(Number(id))
    this.props.getParti(Number(id))
    this.props.getComments(Number(id))
  }
  render() {
    const {classes,competition,system,participants,comments} = this.props
    const undecided:boolean = competition.event_day === null ? true:false
    const commentResult = SearchLog(system.result,"comments")
    const participantsResult = SearchLog(system.result,"participants")
    return (
      <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Paper elevation={0} variant="outlined" className={classes.paper}>
            { system.loading.competition && <Progress/>}
            { !system.loading.competition && competition.id !== undefined &&
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Typography variant="h1" className={classes.day}> 
                {undecided ? "日時未定" : dataFormatwithday(competition.event_day)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography variant="h1" > 
                {competition.title }
                </Typography>
              </Grid>
              {competition.keyword !== "" && 
              <Grid item xs={12} sm={12}>
                {                 
                  <KeyWords keyWords={competition.keyword.split(",")}/>
                }
              </Grid>
              }
             {(competition.club !== null || competition.place_text !== null) &&
              <Grid item xs={12} sm={12}>
                <Typography variant="subtitle1">
                 開催場所 : {competition.club == null ? competition.place_text:competition.club.name + "  " + competition.club.address} 
                </Typography>
              </Grid>
             }
              <Grid item xs={12} sm={12}>
                <List>
                  <ListItem style={{padding:0}}>
                   <ListItemAvatar style={{minWidth:40}}> 
                    <Avatar src={process.env.PUBLIC_URL + "/"+ competition.user.avatar} aria-label="event" className={classes.avatar}/>
                   </ListItemAvatar> 
                   <ListItemText 
                  primary={<Typography variant="caption" component="p">{competition.user.screen_name}</Typography>}
                  secondary={<Typography variant="caption">@{competition.user.sns_id}</Typography>}/>
                  </ListItem>
                </List>
                <Divider/>
                  <div className={classes.mde} dangerouslySetInnerHTML={{__html:marked(competition.contents)}}/>
              </Grid>
            </Grid>
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
                  参加者({ExtractionParticipants(1,participants).length}人) { competition.capacity == 0 ? "": "/ 定員:" + competition.capacity + "人"}
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
            {commentResult.status !== 200 && <Message mes={commentResult.cause}/>}
            {system.loading.comments && <Progress/>}
            {!system.loading.comments && SearchLog(system.result,"comments").status === 200 &&
            <List>
              { comments.map((data) => (
                  <ListItem key={data.id} divider style={{padding:0}} alignItems="flex-start">
                   <ListItemAvatar style={{minWidth:40,verticalAlign:"top"}} > 
                    <Avatar src={process.env.PUBLIC_URL + "/" + data.user.avatar} aria-label="event" className={classes.avatar}/>
                   </ListItemAvatar> 
                   <ListItemText 
                  primary={<Typography variant="caption" component="p">{data.message}</Typography>}
                  secondary={<Typography variant="caption">{data.user.screen_name} {dateFormat(data.update_at)} </Typography>}/>
                  </ListItem>
              ))}
            </List>
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
    system:state.system
  }
}
const mapDispatchToProps = (dispatch:Dispatch)=>{
  return {
     getdata(id:number){
       GetCompetition(id)(dispatch)
     },
     getParti(id:number){
       GetParticipants(id)(dispatch)
     },
     getComments(id:number){
       GetComments(id)(dispatch)
     },
     resetLog() {
       dispatch(ResetResult())
     }
  }
}
type ReduxProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withStyles(styles,{withTheme:true})(CompeDetail)))
