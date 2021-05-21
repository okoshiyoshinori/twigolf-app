import React from 'react'
import {Dispatch} from 'redux'
import {connect} from 'react-redux'
import {RouteComponentProps,withRouter} from 'react-router-dom'
import {withStyles,WithStyles,createStyles} from '@material-ui/styles'
import {FormControl,Select,MenuItem,Avatar,Box,Button,Theme,Grid,Typography,Paper} from '@material-ui/core'
import {Helmet} from 'react-helmet'
import {RootState} from '../store'
import {ResetResult} from '../store/system/actions'
import {BundleParticipant,PostParticipant} from '../store/app/types'
import {GetParticipants,PostBundlePatricipant} from '../store/app/api'
import {SearchLog} from '../util/util'
import querystring from 'query-string'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Progress from '../components/progress'

type transaction = {
    uid:number
    status:number
  }

interface Props extends ReduxType,RouteComponentProps,WithStyles<typeof styles>{}
type State = {
  participants: transaction[]
  disable:boolean
}

const styles = (theme:Theme) => createStyles({
  root: {
  },
     formControl: {
      margin: theme.spacing(1),
      minWidth: 100,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  paper: {
    padding:"5px",
    borderRadius: "10px"
  },
  helperTxt: {
    color: theme.palette.info.dark
  }
}) 

class PaManagement extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props)
    this.state = {
      participants:[] as transaction[],
      disable:true
    }
  }
  componentDidMount() {
    const cid = this.queryParse()
    this.props.getParti(Number(cid))
  }
  componentDidUpdate(Prov:Props) {
    if (Prov.participants !== this.props.participants) {
      const data = [] as transaction[]
      this.props.participants.forEach((val) => {
        data.push(
          {
            uid:val.user_id,
            status:val.status,
          }
        )
      })
      this.setState({disable:true,participants:data})
    }
  }
  componentWillUnmount() {
    this.props.resetLog()
  }
  handleChange(uid:number,status:number) {
    const {participants} = this.props
    const data = this.state.participants.slice()
    let disable = true 
    data.forEach(val => {
      if (val.uid === uid) {
        val.status = status
      }
    })
    data.forEach((v1) => {
      let result = participants.find((v2) => v1.uid === v2.user_id)
      if (result === undefined) return
      if (result.status !== v1.status) {
        disable = false
      }
    })
    this.setState({disable:disable,participants:data})
  }
  send() {
    const {participants} = this.state
    let sendData:BundleParticipant = {} as BundleParticipant
    let temparray:PostParticipant[] = [] as PostParticipant[]
    //削除あるか？
    let result = participants.find(val => val.status === 4)
    if (result !== undefined) {
      if (!window.confirm("削除が含まれます。本当に削除しますか？")) {
        return
      }
    }
    participants.forEach((v1) => {
      let result = this.props.participants.find((v2) => v2.user_id === v1.uid)
      if (result !== undefined && result.status !== v1.status) {
        let tmp:PostParticipant = {
            id: result.id,
            competition_id:result.competition_id,
            user_id:v1.uid,
            status:v1.status
          }
          temparray.push(tmp)
      }
    })
    sendData.transaction = temparray
    this.props.postParticipant(sendData)
  }
  getStatus(uid:number):number{
    let d = this.state.participants.find((val) => val.uid === uid)
    return d === undefined ? 4: d.status
  }
  queryParse():string {
    const parse = querystring.parse(this.props.location.search)
    return parse.cid === undefined ? "0": parse.cid as string
  }
  render() {
    const {classes,system,participants} = this.props
    const results = SearchLog(system.result,"participants")
    return (
      <Grid container direction="row" justify="flex-start" spacing={1}>
            <div className="PaManagement">
              <Helmet>
                <title>参加者管理</title>
              </Helmet>
            </div>
          <Grid item xs={12} sm={12}>
           <Typography variant="h1" style={{marginBottom:"10px"}}>
              参加管理
            </Typography>
            <Typography variant="caption">
               参加者の削除など主催者権限で参加状況の変更をすることができます。
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Paper variant="outlined" className={classes.paper}>
              { system.loading.participants && <Progress/>}
              { !system.loading.participants && results.status === 200 &&
              <List>
                { participants.map(val => ( 
                  <ListItem key={val.id} divider alignItems="center" >
                    <ListItemAvatar>
                      <Avatar 
                        src={ val.user.avatar} />
                    </ListItemAvatar>
                    <ListItemText primary={
                       <React.Fragment>
                      <Typography variant="caption">
                        {val.user.name}
                      </Typography>
                      <Typography variant="caption" component="p" >
                        {val.user.screen_name}
                      </Typography>
                      </React.Fragment>
                     }
                    />
                    <ListItemSecondaryAction>
                    <FormControl className={classes.formControl}>
                          <Select
                            value={this.getStatus(val.user_id)}
                            onChange={(e) => this.handleChange(val.user_id,Number(e.target.value))}
                          >
                            <MenuItem value={1}>参加</MenuItem>
                            <MenuItem value={2}>興味あり</MenuItem>
                            <MenuItem value={3}>不参加</MenuItem>
                            <MenuItem value={4}>削除する</MenuItem>
                          </Select>
                      </FormControl>
                    </ListItemSecondaryAction>
                  </ListItem>
                ) 
                )}
              </List>
              }
              <Box style={{padding:20}}>
                <Button color="primary" disabled={this.state.disable} style={{color:"#fff",fontWeight:700}}
                variant="contained" disableElevation onClick={() => this.send()}>
                  保存する
                </Button>
              </Box>
            </Paper>
          </Grid>
      </Grid>
    )
  }
}


const mapStateToProps = (state:RootState) => {
  return {
    participants:state.app.participants,
    system: state.system
  }
}

const mapDispatchProps = (dispatch:Dispatch) => {
  return {
    getParti(id:number){
       GetParticipants(id)(dispatch)
    },
    postParticipant(data:BundleParticipant){
      PostBundlePatricipant(data)(dispatch)
    },
    resetLog(){
      dispatch(ResetResult())
    }
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchProps>


export default connect(mapStateToProps,mapDispatchProps)(withRouter(withStyles(styles,{withTheme:true})(PaManagement)))
