import React from 'react'
import {Dispatch} from 'redux'
import {connect} from 'react-redux'
import {RouteComponentProps,withRouter} from 'react-router-dom'
import {withStyles,WithStyles,createStyles} from '@material-ui/styles'
import {Box,Button,TextField,Theme,Grid,Typography,Paper} from '@material-ui/core'
import {Helmet} from 'react-helmet'
import {RootState} from '../store'
import {ResetResult} from '../store/system/actions'
import {PostRealNameData} from '../store/app/api'
import {PostRealName} from '../store/app/types'
import {GetSession} from '../store/session/api'
import {SearchLog} from '../util/util'

interface Props extends ReduxType,RouteComponentProps,WithStyles<typeof styles>{}
type State = {
  real_name: {
    name: {
      error:boolean
      error_message:string
      value:string
    }
    kana: {
      error:boolean,
      error_message: string
      value:string
    }
  }
}

const styles = (theme:Theme) => createStyles({
  root: {
  },
  paper: {
    padding:"20px",
    borderRadius: "10px"
  },
  formLabel: {
    color: theme.palette.grey[900],
    fontSize: 15,
    '&.Mui-focused': {
      color:theme.palette.primary.main
    }
  },
  helperTxt: {
    color: theme.palette.info.dark
  }
}) 

class Config extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props)
    this.state = {
      real_name: {
        name: {
          error:false,
          error_message:"",
          value:this.props.session.auth.real_name == null ? "": this.props.session.auth.real_name
        },
        kana: {
          error:false,
          error_message: "",
          value:this.props.session.auth.real_name_kana == null ? "": this.props.session.auth.real_name_kana
        }
      }
    }
  }
  componentDidMount() {
    this.props.getSession()
  }
  checkName() {
    const {real_name} = this.state
    real_name.name.error = false
    real_name.name.error_message = "" 
    if (real_name.name.value == "") {
      real_name.name.error = true
      real_name.name.error_message = "氏名を入力してください"
      this.setState({
        ...this.state,
        real_name: {
          ...this.state.real_name,
          name: {
            ...this.state.real_name.name,
            error:real_name.name.error, 
            error_message: real_name.name.error_message 
          }
        }
      })
    }
  }
  checkKana() {
    const {real_name} = this.state
    real_name.kana.error = false
    real_name.kana.error_message = "" 
    if (real_name.kana.value == "") {
      real_name.kana.error = true
      real_name.kana.error_message = "ふりがなを入力してください"
      this.setState({
        ...this.state,
        real_name: {
          ...this.state.real_name,
          kana: {
            ...this.state.real_name.kana,
            error:real_name.kana.error, 
            error_message: real_name.kana.error_message 
          }
        }
      })
    }
  }
  send() {
    this.checkName()
    this.checkKana()
    if (!this.state.real_name.name.error && !this.state.real_name.kana.error) {
      let data = {
        id: this.props.session.auth.id,
        real_name: this.state.real_name.name.value,
        real_name_kana: this.state.real_name.kana.value
      }
      this.props.postRealName(data)
    }
  }
  componentWillUnmount() {
    this.props.getSession()
    this.props.resetLog()
  }
  render() {
    const {classes,session,system} = this.props
    const {real_name} = this.state
    return (
      <Grid container direction="row" justify="flex-start" spacing={2}>
          <Grid item xs={12} sm={12}>
            <div className="Plan">
              <Helmet>
                <title>設定</title>
              </Helmet>
            </div>
            <Typography variant="h1" style={{marginBottom:"10px"}}>
              設定
            </Typography>
            <Paper variant="outlined" className={classes.paper}>
              <Typography variant="h2" style={{marginBottom:"10px"}}>
                氏名を登録する
              </Typography>
              <Typography variant="caption">
                参加イベントの主催者に氏名を通知することができます。
              </Typography>
              <Box style={{marginTop:13}}>
                <TextField label="氏名" error={real_name.name.error} value={real_name.name.value} helperText={real_name.name.error_message} 
                fullWidth required id="name" variant="standard" InputLabelProps={{
                shrink: true,
                className: classes.formLabel
                }}
                onChange={(e)=> this.setState({
                   ...this.state, 
                   real_name: {
                     ...this.state.real_name,
                     name: {
                       ...this.state.real_name.name,
                       value: e.target.value
                     }
                   }
                  })}
                />
              </Box>
              <Box style={{marginTop:13}}>
                <TextField label="ふりがな" error={real_name.kana.error} value={real_name.kana.value} helperText={real_name.kana.error_message} 
                fullWidth required id="kana" variant="standard" InputLabelProps={{
                shrink: true,
                className: classes.formLabel
                }}
                onChange={(e)=> this.setState({
                   ...this.state, 
                   real_name: {
                     ...this.state.real_name,
                     kana: {
                       ...this.state.real_name.kana,
                       value: e.target.value
                     }
                   }
                  })}
                />
              </Box>
              <Box style={{marginTop:15}}>
                <Button
                 disableElevation
                 disabled={system.loading.user}
                 color="primary"
                 variant="contained"
                 style={{color:"#fff",fontWeight:700}}
                 onClick={()=> this.send()}>
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
    session:state.session,
    system: state.system
  }
}

const mapDispatchProps = (dispatch:Dispatch) => {
  return {
    postRealName(data:PostRealName) {
      PostRealNameData(data)(dispatch)
    },
    getSession() {
      GetSession()(dispatch)
    },
    resetLog(){
      dispatch(ResetResult())
    }
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchProps>


export default connect(mapStateToProps,mapDispatchProps)(withRouter(withStyles(styles,{withTheme:true})(Config)))
