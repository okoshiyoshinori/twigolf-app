import React from 'react'
import {RouteComponentProps,withRouter} from 'react-router-dom'
import {withStyles,WithStyles,createStyles} from '@material-ui/styles'
import {Table,TableBody,TableHead,TableRow,TableContainer,TableCell,Box,Divider,TextField,Button,Avatar,List,colors,ListItem,CircularProgress,ListItemAvatar,ListItemText,Theme,Grid,Typography,Paper} from '@material-ui/core'
import {RootState} from '../store'
import {connect} from 'react-redux' 
import {Dispatch} from 'redux'
import {Competition} from '../store/app/types'
import {GetCompetition,GetParticipants,GetCombinationData} from '../store/app/api'
import {getStatus,getAge,getSex,SearchLog,dateFormatwithTime,getInOut,getName,dateFormat,getAvatar} from '../util/util'
import {ResetResult} from '../store/system/actions'
import Progress from '../components/progress'
import Message from '../components/message'
import {Helmet} from 'react-helmet'
import PlaceIcon from '@material-ui/icons/Place'
import EventIcon from '@material-ui/icons/Event'
import {dataFormatwithday} from '../util/util'

interface MatchParams {
  cid:string
}

interface Props extends ReduxProps,RouteComponentProps<MatchParams>,WithStyles<typeof styles>{}

const styles = (theme:Theme) => createStyles({
  day: {
    color:theme.palette.primary.dark
  },
  body: {
    '& > *': {
        fontSize: 13,
      }
  },
  table: {
    whiteSpace:"nowrap",
    overflowX: "scroll",
    minWidth:650,
  },
  header: {
    backgroundColor:colors.teal[500],
    '& > *': {
        fontWeight:600,
        fontSize: 13,
        color:colors.common.white
      }
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

interface State{}

class Combinations extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props)
  }
  componentDidMount(){
    const cid = this.props.match.params.cid
    this.props.getdata(Number(cid))
    this.props.getCombinations(Number(cid))
    this.props.getParti(Number(cid))
  }
  render(){
    const {classes,competition,system,combinations,participants} = this.props
    const log = SearchLog(system.result,"combinations")
    if (!system.loading.competition && competition.id == undefined) {
      return (
        <Message mes="該当のデータはありません" />
      )
    }
    return (
      <Grid container spacing={1}>
       { system.loading.competition || system.loading.combinations && <Progress/> }
       { !system.loading.competition && !system.loading.combinations &&
       <>
        <div className="Detail">
          <Helmet>
            <title>ペアリング</title>
          </Helmet>
        </div>
        <Grid item xs={12} sm={12} style={{marginBottom:10}}>
            <Typography variant="h1" style={{marginBottom:"10px"}}>
              ペアリング
            </Typography>
          <Paper elevation={0} variant="outlined" className={classes.paper}>
            <Typography variant="h2" style={{lineHeight:1.4,marginBottom:15}}>
            {competition.title}
            </Typography>
            <Typography variant="caption" style={{marginBottom:20}}>
                <div style={{display: 'flex',alignItems: 'center',flexWrap: 'nowrap',}}>
                 <PlaceIcon style={{fontSize:18,color:colors.grey[600]}}/>
                 <span style={{marginLeft:5}}>
                  {competition.place_text == null ? "未定" : competition.place_text}
                 </span>
                </div>
            </Typography>
            <Typography variant="caption">
                <div style={{display: 'flex',alignItems: 'center',flexWrap: 'nowrap',}}>
                  <EventIcon style={{fontSize:18,color:colors.grey[600]}}/> <span style={{marginLeft:5}}>{competition.event_day == null ? 
                  "未定" : dataFormatwithday(competition.event_day)}</span>
                </div>
            </Typography>
          </Paper>
        </Grid>
        { log.status != 999 && log.status != 200 && <Message mes={log.cause} />}
        {  log.status == 200  &&
        <Grid item xs={12} sm={12}>
          <TableContainer elevation={0} component={Paper} style={{width:"100%"}}>
              <Table size="medium" className={classes.table} >
                <TableHead>
                  <TableRow className={classes.header} >
                    <TableCell align="left">スタート時間</TableCell>
                    <TableCell align="right">IN/OUT</TableCell>
                    <TableCell align="right">P1</TableCell>
                    <TableCell align="right">P2</TableCell>
                    <TableCell align="right">P3</TableCell>
                    <TableCell align="right">P4</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                { combinations.payload.map((val) => ( 
                  <TableRow className={classes.body}>
                    <TableCell align="left">{dateFormatwithTime(val.start_time)}</TableCell>
                    <TableCell align="right">{getInOut(val.start_in_out)}</TableCell>
                    <TableCell align="right">{getName(participants,val.member1)}</TableCell>
                    <TableCell align="right">{getName(participants,val.member2)}</TableCell>
                    <TableCell align="right">{getName(participants,val.member3)}</TableCell>
                    <TableCell align="right">{getName(participants,val.member4)}</TableCell>
                  </TableRow>
                 ))
                }
                </TableBody>
                </Table>
           </TableContainer>
        </Grid>
        }
        </>
       }
      </Grid>
    )
  }
}

const mapStateToProps = (state:RootState) => {
  return {
    competition: state.app.competition,
    combinations:state.app.combinations,
    participants: state.app.participants,
    system:state.system,
    session:state.session
  }
}
const mapDispatchToProps = (dispatch:Dispatch)=>{
  return {
     getdata(id:number){
       GetCompetition(id)(dispatch)
     },
     getCombinations(cid:number) {
       GetCombinationData(cid)(dispatch)
     },
     resetLog() {
       dispatch(ResetResult())
     },
     getParti(id:number){
       GetParticipants(id)(dispatch)
     }
  }
}
type ReduxProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withStyles(styles,{withTheme:true})(Combinations)))
