import React from 'react'
import {Dispatch} from 'redux'
import {connect} from 'react-redux'
import {RouteComponentProps,withRouter} from 'react-router-dom'
import {withStyles,WithStyles,createStyles} from '@material-ui/styles'
import {FormControl,FormHelperText,Select,MenuItem,InputLabel,Box,Button,TextField,Theme,Grid,Typography,Paper} from '@material-ui/core'
import {Helmet} from 'react-helmet'
import {RootState} from '../store'
import {ResetResult} from '../store/system/actions'
import {PostRealNameData} from '../store/app/api'
import {PostRealName} from '../store/app/types'
import {GetSession} from '../store/session/api'
import {dateFormatNotime} from '../util/util'

interface Props extends ReduxType,RouteComponentProps,WithStyles<typeof styles>{}
type State = {
  real_name: {
    name: {
      error:boolean
      error_message:string
      value:string
    }
    kana: {
      error:boolean
      error_message: string
      value:string
    }
  }
  sex: {
    error:boolean
    error_message:string
    value:number
  }
  birthday: {
    error:boolean
    error_message:string
    value:string
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
      minWidth: 100,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
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
      },
      sex: {
        error:false,
        error_message:"",
        value:this.props.session.auth.sex == null ? 0: this.props.session.auth.sex
      },
      birthday: {
        error:false,
        error_message:"",
        value:this.props.session.auth.birthday == null ? "": dateFormatNotime(this.props.session.auth.birthday)
        }
    }
  }
  checkName():boolean {
    const {real_name} = this.state
    real_name.name.error = false
    real_name.name.error_message = "" 
    if (real_name.name.value === "") {
      real_name.name.error = true
      real_name.name.error_message = "氏名を入力してください"
    }
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
    return real_name.name.error
  }
  checkKana():boolean {
    const {real_name} = this.state
    real_name.kana.error = false
    real_name.kana.error_message = "" 
    if (real_name.kana.value === "") {
      real_name.kana.error = true
      real_name.kana.error_message = "ふりがなを入力してください"
    }
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
    return real_name.kana.error
  }
  checkSex():boolean {
    const {sex} = this.state
    sex.error = false
    sex.error_message = ""
    if (!sex.value) {
      sex.error = true
      sex.error_message = "選択してください"
    }
      this.setState({
        ...this.state,
        sex: {
          ...this.state.sex,
          error:sex.error,
          error_message:sex.error_message
          }
        }
      )
    return sex.error
  }
  checkBirthday():boolean {
    const {birthday} = this.state
    birthday.error = false
    birthday.error_message = ""
    if (birthday.value === "") {
      birthday.error = true
      birthday.error_message = "選択してください"
    }
      this.setState({
        ...this.state,
        birthday: {
          ...this.state.birthday,
          error:birthday.error,
          error_message:birthday.error_message
          }
        }
      )
    return birthday.error
  }
  send() {
    if (!this.checkName() && !this.checkKana() && !this.checkSex() && !this.checkBirthday()) {
      let data = {
        id: this.props.session.auth.id,
        real_name: this.state.real_name.name.value,
        real_name_kana: this.state.real_name.kana.value,
        sex:this.state.sex.value,
        birthday:new Date(this.state.birthday.value)
      }
      this.props.postRealName(data)
    }
  }
  componentWillUnmount() {
    this.props.getSession()
    this.props.resetLog()
  }
  render() {
    const {classes,system} = this.props
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
              <Typography variant="h3" style={{marginBottom:"10px"}}>
              基本情報を登録する
              </Typography>
              <Typography variant="caption">
                参加イベントの主催者に基本情報を通知することができます。
                必須ではありませんが、コンペの際に必要になる事が多いので予め登録する事をお勧めします。
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
               <FormControl required className={classes.formControl}>
                <InputLabel error={this.state.sex.error} shrink id="sex" className={classes.formLabel}>
                  性別
                </InputLabel>
                <Select
                 fullWidth
                 value={this.state.sex.value}
                 error={this.state.sex.error}
                 label="性別"
                 required
                 onChange={(e) => this.setState({
                 ...this.state,
                 sex: {
                    ...this.state.sex,
                    value:Number(e.target.value)
                 }
                 })}
                >
                <MenuItem value={0}>選択</MenuItem>
                <MenuItem value={1}>男性</MenuItem>
                <MenuItem value={2}>女性</MenuItem>
               </Select>
               <FormHelperText error={this.state.sex.error}>{this.state.sex.error_message}</FormHelperText>
              </FormControl>
              </Box>
              <Box style={{marginTop:15}}>
              <TextField
               id="date"
               label="誕生日"
               error={this.state.birthday.error}
               helperText={this.state.birthday.error_message}
               fullWidth
               required
               type="date"
               value={this.state.birthday.value}
               FormHelperTextProps={{
                 className:classes.helperTxt
               }}
               onChange={(e)=>this.setState({
                 ...this.state,
                 birthday: {
                   ...this.state.birthday,
                   value: e.target.value
                 }
               })}
               InputLabelProps={{
               shrink: true,
               className: classes.formLabel
               }}
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
