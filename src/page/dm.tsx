import React from 'react'
import {RouteComponentProps,withRouter} from 'react-router-dom'
import {withStyles,WithStyles,createStyles} from '@material-ui/styles'
import {colors,Chip,FormControl,Select,MenuItem,InputLabel,Box,Button,TextField,Theme,Grid,Typography,Paper} from '@material-ui/core'
import querystring from 'query-string'
import {RootState} from '../store'
import {connect} from 'react-redux' 
import {Dispatch} from 'redux'
import {TwitterDm} from '../store/app/types'
import {SendDM,GetCompetition,GetParticipants} from '../store/app/api'
import {ExtractionParticipantsToScreenName,SearchLog} from '../util/util'
import {ResetResult} from '../store/system/actions'
import Progress from '../components/progress'
import {Helmet} from 'react-helmet'
import Alert from '@material-ui/lab/Alert'


interface Props extends ReduxProps,RouteComponentProps,WithStyles<typeof styles>{}

type State = {
  cid: number | null
  partiSelect: number 
  _name: string
  users: string[]
  comment: {
      value:string,
      error:boolean,
      helper:string
    }
}

const styles = (theme:Theme) => createStyles({
  root: {
  },
  paper: {
    padding:"20px",
    borderRadius: "10px"
  },
   formControl: {
      minWidth: "100%",
      '& > *': {
          fontSize: 13
        }
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  formLabel: {
    color: theme.palette.grey[900],
    fontSize: 15,
    width:"100%",
    '&.Mui-focused': {
      color:theme.palette.primary.main
    }
  },
  helperTxt: {
    color: theme.palette.common.black
  },
  title: {
      display:"-webkit-box",
      boxOrient:"vertical",
      overflow:"hidden",
      width:"100%",
      lineClamp:1,
      fontWeight:500
  },
  keywords: {
       display: 'flex',
       justifyContent: 'left',
       flexWrap: 'wrap',
       listStyle: 'none',
       padding: theme.spacing(0.5),
       margin: 0,
      },
      chip: {
       margin: theme.spacing(0.5),
       color: theme.palette.common.black,
       fontWeight:600,
      }
}) 

class Dm extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props)
    this.state = {
      cid:null,
      partiSelect: 0,
      _name: "",
      users: [],
      comment: {
          value:"",
          error:false,
          helper:""
        }
    }
  }
  componentDidMount() {
    const parse = querystring.parse(this.props.location.search)
    if (parse.cid !== undefined) {
      this.props.getCompe(Number(parse.cid))
      this.props.getParti(Number(parse.cid))
    }
  }
  componentDidUpdate(prov:Props) {
    if (this.props.competition !== prov.competition ) {
      this.setState({
        cid: this.props.competition.id
      })
    }
  }
  check(name:string):boolean {
    const {users} = this.state
    return users.includes(name)
  }
  handleDelete(s:string) {
    const {users} = this.state
    const result = users.filter((val) => val !== s)
    this.setState({
      users:result
    })
  }
  handleChange(e:React.ChangeEvent<{value:number}>) {
    const {participants,session} = this.props
    const {users,partiSelect} = this.state
    const before = partiSelect
    const after = e.target.value
    const deleteData = ExtractionParticipantsToScreenName(before,participants)
    const addData = ExtractionParticipantsToScreenName(after,participants).filter(val => val !== session.auth.screen_name)
    let newData:string[] = []
    let difference = users.filter(val => deleteData.indexOf(val) === -1 ) 
    newData = [...difference,...addData]
    this.setState({
      partiSelect:after,
      users:newData
    })
  }
  componentWillUnmount() {
    this.props.resetLog()
  }
  sendDmessage() {
    const data:TwitterDm = {
        message: this.state.comment.value,
        users:this.state.users,
    }
    this.props.sendDm(data)
  }
  render() {
    const {classes,system,competition} = this.props
    const {users,_name} = this.state
    const errlog = SearchLog(system.result,"send_dm")
    return (
      <Grid container spacing={1}>
        <div className="DM">
          <Helmet>
            <title>DM一括送信</title>
          </Helmet>
        </div>
          <Grid item xs={12} sm={12}>
            <Typography variant="h1" style={{marginBottom:10}}>
              DM一括送信
            </Typography>
            <Paper variant="outlined" className={classes.paper}>
             <Typography variant="subtitle2" component="p">
                複数の宛先にTwitterのダイレクトメッセージを一括送信することができます。
                下記よりtwitterID(@不要)を入力してください。
             </Typography>
             <Typography variant="caption" style={{color:colors.red[800],fontWeight:"bold"}}>
                1日に送信できるメッセージは1,000件です。<br/>
                送信可能な条件は以下のいずれか<br/>
                ・あなたをフォローしているユーザー<br/>
                ・すべてのアカウントから受信を許可しているユーザー<br/>
             </Typography>
            </Paper>
          </Grid>
          {(system.loading.competition || system.loading.participants ) && <Progress/>}
          {!system.loading.competition && !system.loading.participants &&
          <Grid item xs={12} sm={12} >
            <Paper variant="outlined" className={classes.paper}>
              { errlog.status !== 999 && errlog.status !== 200 &&
              <Box style={{marginBottom:15}}>
                <Alert severity="error" style={{whiteSpace:"pre-wrap"}}>
                  {errlog.cause}
                </Alert>
              </Box>
                }
              <Typography variant="subtitle2" component="p">
                送信先一覧
              </Typography>
              <Box p={1} bgcolor={colors.grey[100]} style={{minHeight:"10vh"}} border={1} borderColor={colors.grey[400]} borderRadius={10}>
                {users.length <= 0 &&
                  <Typography variant="subtitle2" component="p" style={{color:colors.grey[600]}}>
                    まだ宛先がありません
                  </Typography>
                }
                <ul className={classes.keywords}>
                {
                 users.map((s:string)=> (
                <li >
                  <Chip label={s} size="small" onDelete={() => this.handleDelete(s) }  className={classes.chip}/>
                </li>
                ))
                }
                </ul>
              </Box>
              { this.state.cid != null &&
            <Box style={{marginTop:15}}>
             <FormControl  className={classes.formControl}>
                <InputLabel  shrink id="participants" className={classes.formLabel}>
                <span className={classes.title}>{competition.title}</span>
                </InputLabel>
                <Select
                 fullWidth
                 value={this.state.partiSelect}
                 label=""
                 onChange={(e:React.ChangeEvent<any>) => this.handleChange(e)}
                >
                <MenuItem value={0}>選択する</MenuItem>
                <MenuItem value={1}>参加者</MenuItem>
                <MenuItem value={2}>興味あり</MenuItem>
                <MenuItem value={3}>不参加</MenuItem>
               </Select>
              </FormControl>
            </Box>
            }
              <Box style={{marginTop:15}}>
              <TextField
              id="userid"
              variant="standard"
              label="送信先を追加"
              value={this.state._name}
              fullWidth
              InputLabelProps={{
                className:classes.formLabel,
                shrink:true
              }}
              onChange={(e)=>this.setState({_name:e.target.value})}
              onBlur={e => {
                if (!this.check(_name) && _name !== "") {
                    users.push(_name)
                    this.setState({_name:''})
                }
              }}
              onKeyDown={e => {
                if (e.keyCode === 13) {
                  if (!this.check(_name)) {
                    users.push(_name)
                    this.setState({_name:''})
                  }
                }
              }}
            />
            </Box>
            <Box style={{marginTop:20}}>
            <TextField  fullWidth multiline required id="comment" style={{marginTop:10}}  value={this.state.comment.value}
            onChange={(e:React.ChangeEvent<any>) => this.setState({
              comment: {
                  ...this.state.comment,
                  value: e.target.value
                }
              })}
            variant="standard"
            label="メッセージ"
            error={this.state.comment.error} 
            helperText={this.state.comment.helper} 
            InputLabelProps={{
                className:classes.formLabel,
                shrink:true
            }} />
            {system.loading.dm && <Progress />}
            {!system.loading.dm &&
            <Button variant="contained" disableElevation
            disabled={
              this.state.users.length <= 0 || 
              this.state.comment.value === "" || 
              system.loading.dm
            } 
            onClick={() => this.sendDmessage()} color="primary"
            style={{marginTop:20,color:"white",fontWeight:700}}>
            送信する
            </Button>
            }
            </Box>
            </Paper>
          </Grid>
          }
      </Grid>
    )
  }
}

const mapStateToProps = (state:RootState) => {
  return {
    competition: state.app.competition,
    participants: state.app.participants,
    system:state.system,
    session:state.session
  }
}
const mapDispatchToProps = (dispatch:Dispatch)=>{
  return {
     getCompe(id:number){
       GetCompetition(id)(dispatch)
     },
     sendDm(data:TwitterDm) {
       SendDM(data)(dispatch)
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
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withStyles(styles,{withTheme:true})(Dm)))
