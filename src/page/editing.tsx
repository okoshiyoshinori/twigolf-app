import React from 'react'
import {createStyles,Theme,withStyles,WithStyles} from '@material-ui/core/styles'
import {withRouter,RouteComponentProps} from 'react-router-dom'
import {List,ListItem,ListItemText,Button,Dialog,DialogTitle,DialogContent,IconButton,Checkbox,Grid,Chip,Typography,TextField,Paper,InputAdornment} from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import {colors} from '@material-ui/core'
import Mde from '../components/mde'
import PlaceIcon from '@material-ui/icons/Place'
import CloseIcon from '@material-ui/icons/Close'
import {RootState} from '../store/'
import {Club,PostCompetition} from '../store/app/types'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import {DeleteCompetition,GetCompetition,GetClubs,PostCompetitionDate} from '../store/app/api'
import {ResetResult} from '../store/system/actions'
import Progress from '../components/progress'
import Message from '../components/message'
import querystring from 'query-string'
import {SearchLog} from '../util/util'
import {dayEditor,dateFormat} from '../util/util'
import {Helmet} from 'react-helmet'


interface Props extends ReduxType,RouteComponentProps,WithStyles<typeof styles>{}

type keyData = {
  key:number,
  word:string
}

interface State{
  hikaku:string
  cid:number
  club_keyword:string
  open:boolean
  keywords: keyData[] 
  _word: string
  input: {
    title: {
      error: boolean
      error_message:string
      value:string
      check:()=>void
    }
    detail: {
      error:boolean
      error_message:string
      value:string
      check:()=>void
    }
    keyword :{
      error:boolean
      error_message:string
      value:string | null
      check:()=>void
    }
    place: {
      error:boolean
      error_message:string
      value:string | null
      club:number | null
      check:()=>void
    },
    event_day: {
      error:boolean
      error_message:string
      value:string
      check:()=>void
    }
    event_deadline: {
      error:boolean
      error_message:string
      value:string
      check:()=>void
    }
    capacity: {
      error:boolean,
      error_message:string,
      value:number | null,
      check:()=>void
    }
    twitter: {
      value:boolean
    }
  }
}

const styles = (theme:Theme) => createStyles({
      root: {
        width:"100%",
        '& > *': {
          margin: theme.spacing(1),
          width: '100%'
        }
      },
      formLabel: {
        color: theme.palette.grey[900],
        fontSize: 16,
        '&.Mui-focused': {
          color:theme.palette.primary.main
        }
      },
      check: {
        color: theme.palette.grey[400],
        '&$checked': {
          color: theme.palette.primary.main
        }
      },
      modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper : {
        minWidth:400,
        padding:theme.spacing(2),
        position: 'absolute',
        border: '1px solid #fff'
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

class New extends React.Component<Props,State>{
  constructor(props:Props) {
    super(props)
    this.state = {
      hikaku:"",
      cid:0,
      club_keyword:"",
      open:false,
      keywords: [], 
      _word: '',
      input: {
        title: {
          error:false,
          error_message:"",
          value:"",
          check:()=> this.checkTitle()
        },
        detail: {
          error:false,
          error_message:"",
          value:"",
          check:()=> this.checkDetail()
        },
        keyword: {
          error:false,
          error_message:"",
          value:null,
          check:()=>{} 
        },
        place: {
          error:false,
          error_message:"",
          value:null,
          club: null,
          check :()=>{} 
        },
        event_day: {
          error:false,
          error_message:"",
          value:"",
          check:()=> this.checkEventday() 
        },
        event_deadline: {
          error:false,
          error_message:"",
          value:"",
          check:()=> this.checkDeadline() 
        },
        capacity: {
          error:false,
          error_message:"",
          value:null,
          check:() => this.checkCapacity()
        },
        twitter: {
          value:false
        }
      }
    }
  }
  queryParse():number {
    const parse = querystring.parse(this.props.location.search)
    return parse.cid === undefined ? 0: Number(parse.cid)
  }
  componentWillUnmount() {
    this.props.resetLog()
  }
  componentDidMount() {
    let cid = this.queryParse()
    if (cid === 0) {
      return
    }
    this.props.getCompetition(cid)
  }
  componentDidUpdate(ProveProps:Props) {
    if (this.props.competition !== ProveProps.competition) {
        const {competition} = this.props
        let cid = this.props.competition.id === undefined ? 0: this.props.competition.id
        const {input} = this.state
        let tempKey:keyData[] = [] as keyData[]
        let i:number = 0
        //キーワード
      if (competition.keyword != null) {
        let t = competition.keyword.split(',')
        t.forEach((v:string) =>{
        tempKey.push({key:i,word:v})
        i++
        })
      }
      this.setState({
        cid:cid,
        hikaku: competition.place_text,
        keywords: tempKey,
        input: {
          ...input,
          title:{
            ...input.title,
            value: competition.title, 
          },
          detail:{
            ...input.detail,
            value: competition.contents,
          },
          place:{
            ...input.place,
            club: competition.club_id,
            value: competition.place_text,
          },
          capacity: {
            ...input.capacity,
            value: competition.capacity === 0 ? null:competition.capacity,
          },
          event_day:{
            ...input.event_day,
            value: competition.event_day === null ? "":dateFormat(competition.event_day)
          },
          event_deadline:{
            ...input.event_deadline,
            value: competition.event_deadline === null ? "":dateFormat(competition.event_deadline)
          }
        }
      })
    }
   }
  checkTitle() {
    const {title} = this.state.input
    title.error= false
    title.error_message = ""
    if (title.value === "" ) {
      title.error = true
      title.error_message = "タイトルを入力してください"
    }
    this.setState({
      input: {
        ...this.state.input,
        title: {
          ...this.state.input.title,
          error:title.error,
          error_message:title.error_message
        }
      }
    })
  }
  checkDetail() {
    const {detail} = this.state.input
    detail.error = false
    detail.error_message = ""
    if (detail.value === "") {
      detail.error = true
      detail.error_message = "詳細を入力してください"
    }
    this.setState({
      input: {
        ...this.state.input,
        detail: {
          ...this.state.input.detail,
          error:detail.error,
          error_message:detail.error_message
        }
      }
    })
  }
  checkCapacity() {
    const {capacity} = this.state.input
    capacity.error = false
    capacity.error_message = ""
    if (capacity.value !== null) {
      if (!Number.isInteger(capacity.value)) {
        capacity.error = false
        capacity.error_message = "半角数字で入力してください"
      }
    }
    this.setState({
      input: {
        ...this.state.input,
        capacity: {
          ...this.state.input.capacity,
          error:capacity.error,
          error_message:capacity.error_message
        }
      }
    })
  }
  checkEventday(){
    const {event_day} = this.state.input
    const now = dayEditor()
    event_day.error = false
    event_day.error_message = "" 
    if (event_day.value !== "" && event_day.value !==  null) {
      if (now.isAfter(dayEditor(event_day.value))) {
        event_day.error = true
        event_day.error_message = "今日以降の日付を設定してください"
      }
    }
    this.setState({
      input: {
        ...this.state.input,
        event_day: {
          ...this.state.input.event_day,
          error:event_day.error,
          error_message:event_day.error_message
        }
      }
    })
  }
  checkDeadline(){
    const {event_deadline,event_day} = this.state.input
    const now = dayEditor()
    event_deadline.error = false
    event_deadline.error_message = "" 
    if (event_deadline.value !== "" && event_deadline.value !== null) {
      if (now.isAfter(dayEditor(event_deadline.value))) {
        event_deadline.error = true
        event_deadline.error_message = "今日以降の日時を設定してください"
      }
    }
    if ((event_deadline.value !== "" && event_deadline.value !== null ) && (event_day.value !== "" && event_day.value !== null)) {
      if (!dayEditor(event_day.value).isAfter(dayEditor(event_deadline.value))) {
        event_deadline.error = true
        event_deadline.error_message = "締切日時は開催日時以前に設定してください"
      }
    }
    this.setState({
      input: {
        ...this.state.input,
        event_deadline: {
          ...this.state.input.event_deadline,
          error:event_deadline.error,
          error_message:event_deadline.error_message
        }
      }
    })
  }
  handleDelete(data:keyData) {
    const result = this.state.keywords.filter((d)=> d.word !== data.word)
    this.setState({keywords:result})
  }
  check():boolean {
    return this.state.keywords.some((data) => data.word === this.state._word)
  }
  send() {
   const {input,keywords,hikaku} = this.state
   let temp:string[] = [] as string[]
   let club_id : number | null = null
   keywords.forEach((v) => {
     temp.push(v.word)
   })
   if (temp.length > 0) {
     input.keyword.value = temp.join()
   } else {
     input.keyword.value = null
   }
   if (!this.checkAll()) {
     return
   }
   if (input.place.club !== null) {
     if (hikaku !== input.place.value) {
       club_id = null
     } else {
       club_id = input.place.club
     }
   }

   let data:PostCompetition = {
     id:this.state.cid,
     title:input.title.value,
     contents:input.detail.value,
     capacity:input.capacity.value === 0 ? null:input.capacity.value,
     keyword: input.keyword.value === "" ? null:input.keyword.value,
     place_text:input.place.value === "" ? null: input.place.value,
     club_id:club_id,
     status:1,
     event_day:input.event_day.value === "" ? null: new Date(input.event_day.value),
     event_deadline:input.event_deadline.value === "" ? null:new Date(input.event_deadline.value),
     user_id:this.props.session.auth.id,
     twitter:input.twitter.value
   }
   this.props.sendData(data)
  }
  delete(id:number) {
    if (window.confirm("本当に削除しますか？")) {
      this.props.deleteCompetition(id)
      this.props.resetLog()
      this.props.history.push("/users/" + this.props.session.auth.sns_id)
    }
  }
  checkAll():boolean {
    const {input} = this.state
    input.title.check()
    input.detail.check()
    input.place.check()
    input.event_day.check()
    input.event_deadline.check()
    input.keyword.check()
    input.capacity.check()
    return !input.title.error && !input.detail.error && !input.place.error && !input.event_day.error && !input.event_deadline.error &&
           !input.keyword.error && !input.capacity.error
  }
  handleSelect(data:Club){
    const {input}  = this.state
    let placeStr:string = data.name + "　" + data.address
    this.setState({
      open:false,
      hikaku:placeStr,
      input:{
        ...input,
        place: {
          ...input.place,
          club: data.id,
          value: placeStr 
        }
      }
    })
    this.props.resetLog()
  }
  render(){
    const {classes,system,clubs,getClubs} = this.props
    const {keywords,input,cid} = this.state
    const clubsRsult = SearchLog(system.result,"clubs")
    if (system.loading.competition ) {
      return (<Progress/>)
    }
    return (
     <Grid container spacing={3}> 
      <div className="New">
        <Helmet>
         <title>{cid === 0 ? "イベント作成":"イベント編集"}</title>
        </Helmet>
      </div>
      <Grid item xs={12} sm={12}>
        <Typography variant="h1">
        { cid === 0 && 
         <span> イベントを作成する</span>
        }
        { cid !== 0 &&
         <span> イベントを編集する</span>
         }
         </Typography>
      </Grid>
      <Grid item xs={12} sm={12}>
         <Paper elevation={0} variant="outlined" style={{padding:15}}>
         <Grid container spacing={3}>
           <Grid item xs={12} sm={12}>
            <TextField label="タイトル" error={input.title.error} helperText={input.title.error_message} fullWidth multiline required id="title"
            variant="standard" value={this.state.input.title.value}  onChange={(e) => this.setState({
                  input: {
                    ...input,
                    title: {
                      ...input.title,
                      value: e.target.value
                    }
                  }
              })}  InputLabelProps={{className:classes.formLabel,shrink:true}}/>
           </Grid>
           <Grid item xs={12} sm={12}>
            <Typography  style={{fontSize:13,color:colors.grey[900]}}>
            詳細*
           </Typography>
            <Mde data={input.detail.value} handlerProps={(str:string) => this.setState({
                input: {
                  ...input,
                  detail: {
                    ...input.detail,
                    value:str
                  }
                }
              })} />
            { input.detail.error && <span style={{color:colors.red[700]}}>{input.detail.error_message}</span>
            }
           </Grid>
           <Grid item xs={12} sm={12} style={{paddingTop:0,paddingBottom:0}}>
            <ul className={classes.keywords}>
              {
                keywords.map((d:keyData)=> (
                <li >
                  <Chip label={d.word} size="small" onDelete={() => this.handleDelete(d) }  className={classes.chip}/>
                </li>
                ))
              }
            </ul>
           </Grid>
           <Grid item xs={12} sm={12}>
            <TextField
              id="keyword"
              variant="standard"
              label="キーワード"
              value={this.state._word}
              fullWidth
              InputLabelProps={{
                className:classes.formLabel,
                shrink:true
              }}
              onChange={(e)=>this.setState({_word:e.target.value})}
              onBlur={e => {
                if (!this.check() && this.state._word !== "") {
                    keywords.push({key:0,word:this.state._word})
                    this.setState({_word:''})
                }
              }}
              onKeyDown={e => {
                if (e.keyCode === 13) {
                  if (!this.check()) {
                    keywords.push({key:0,word:this.state._word})
                    this.setState({_word:''})
                  }
                }
              }}
            />
           </Grid>
           <Grid item xs={12} sm={12}>
            <TextField fullWidth multiline id="place"
            variant="standard" 
            label="場所(未定の場合は空欄)"
            InputLabelProps={{
                className:classes.formLabel,
                shrink:true
            }}
            value={this.state.input.place.value}
            onChange={(e) => this.setState({
              input: {
                ...this.state.input,
                place: {
                  ...this.state.input.place,
                  value: e.target.value
                }
              }
            })}
            InputProps={{
                endAdornment:( 
                  <InputAdornment position="end">
                    <IconButton onClick={()=> this.setState({open:true})} size="small">
                    <PlaceIcon/>
                    </IconButton>
                  </InputAdornment>
                 ) 
              }}
            />
           </Grid>
           <Grid item xs={12} sm={12}>
            <TextField
              id="Helddate"
              type="datetime-local"
              variant="standard"
              label="開催日時(未定の場合は空欄)"
              fullWidth
              error={this.state.input.event_day.error}
              helperText={this.state.input.event_day.error_message}
              value={this.state.input.event_day.value}
              onChange={(e) => this.setState({
                input: {
                  ...input,
                  event_day: {
                    ...input.event_day,
                    value:e.target.value
                  }
                }
              })}
              InputLabelProps={{
                className:classes.formLabel,
                shrink:true
              }}
            />
           </Grid>
           <Grid item xs={12} sm={12}>
            <TextField
              id="Deadline"
              type="datetime-local"
              label="締切日時(未定の場合は空欄)"
              variant="standard"
              error={this.state.input.event_deadline.error}
              helperText={this.state.input.event_deadline.error_message}
              fullWidth
              value={this.state.input.event_deadline.value}
              onChange={(e) => this.setState({
                input: {
                  ...input,
                  event_deadline: {
                    ...input.event_deadline,
                    value:e.target.value
                  }
                }
              })}
              InputLabelProps={{
                className:classes.formLabel,
                shrink:true
              }}
            />
           </Grid>
           <Grid item xs={12} sm={12}>
           <TextField
              id="capacity"
              type="number"
              label="参加定員(未定の場合は空欄)"
              InputProps={{inputProps:{min:1}}}
              fullWidth
              variant="standard"
              value={this.state.input.capacity.value}
              onChange={(e) => this.setState({
                input: {
                  ...input,
                  capacity: {
                    ...input.capacity,
                    value:Number(e.target.value)
                  }
                }
              })}
              InputLabelProps={{
                className:classes.formLabel,
                shrink:true
              }}
            />
           </Grid>
           <Grid item xs={12} sm={12}>
             <FormControlLabel  
              control={
                <Checkbox
                className={classes.check}
                name="twitter"
                onChange={(e) => this.setState({
                  input: {
                    ...input,
                    twitter: {
                      value:e.target.checked
                    }
                  }
                })}
                checked={this.state.input.twitter.value}
                color="primary"
                />
              }
              label="Twitterにも投稿"/>
           </Grid>
           <Grid item xs={12} sm={12}>
            <Button disableElevation onClick={()=>this.send()}size="medium" style={{color:"#fff",fontWeight:700}} variant="contained" color="primary">
            {cid === 0 ? "登録する":"更新する"}
            </Button>
            {cid !== 0 && 
            <Button disableElevation onClick={()=>this.delete(Number(cid))}size="medium" style={{color:"#fff",fontWeight:700,marginLeft:15}} variant="contained" color="secondary">
              削除する 
            </Button>
            }
           </Grid>
         </Grid>
        </Paper>
      </Grid>
      <Dialog open={this.state.open} fullScreen>
        <DialogTitle id="dialog" style={{fontWeight:"bold"}}>
          <IconButton edge="start" onClick={()=> {
            this.setState({open:false,club_keyword:""})
            this.props.resetLog()
           }}>
            <CloseIcon/>
          </IconButton>
          ゴルフ場・練習場検索
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            autoFocus
            multiline={false}
            margin="dense"
            id="key"
            label="キーワード"
            type="text"
            onChange={(e) => {
              this.setState({club_keyword:e.target.value})
            }}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                if (this.state.club_keyword !== "") {
                  (e.target as HTMLElement).blur()
                }
              }
            }}
            onBlur={(e) => {
              if (this.state.club_keyword !== "") {
                getClubs(this.state.club_keyword)
              }
            }}
            fullWidth
          />
         {system.loading.clubs && <Progress/>} 
         {clubsRsult.status !== 200 && clubsRsult.status !== 999 && <Message mes={clubsRsult.cause}/>}
         {clubsRsult.status === 200 && !system.loading.clubs &&
           <List>
            {
              clubs.map((val) => (
                <ListItem key={val.id} divider  button alignItems="flex-start">
                <ListItemText style={{padding:20}} onClick={() => this.handleSelect(val)}
                  primary={
                    <Typography variant="h4">
                    {val.name + "　" + val.address}
                    </Typography>
                  }
                 />
                </ListItem>
              ))
            }
           </List>
         }
        </DialogContent>
      </Dialog>
     </Grid>
    )
  }
}

const mapPropsToState = (state:RootState)  => {
  return {
    competition:state.app.competition,
    system:state.system,
    clubs:state.app.clubs,
    session:state.session
  }
}

const mapPropsToDispatch = (dispatch:Dispatch) => {
  return {
    getClubs(key:string) {
      GetClubs(key)(dispatch)
    },
    resetLog() {
      dispatch(ResetResult())
    },
    sendData(data:PostCompetition) {
      PostCompetitionDate(data)(dispatch)
    },
    getCompetition(id:number) {
      GetCompetition(id)(dispatch)
    },
    deleteCompetition(id:number) {
      DeleteCompetition(id)(dispatch)
    }
  }
}
type ReduxType = ReturnType<typeof mapPropsToState> & ReturnType<typeof mapPropsToDispatch>

export default connect(mapPropsToState,mapPropsToDispatch)(withRouter(withStyles(styles,{withTheme:true})(New)))
