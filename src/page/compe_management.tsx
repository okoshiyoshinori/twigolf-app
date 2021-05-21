import React from 'react'
import {Dispatch} from 'redux'
import {connect} from 'react-redux'
import {RouteComponentProps,withRouter} from 'react-router-dom'
import {withStyles,WithStyles,createStyles} from '@material-ui/styles'
import {FormControlLabel,List,ListItem,ListItemAvatar,ListItemText,Chip,Dialog,DialogTitle,DialogContent,Table,TableBody,TableCell,TableContainer,Checkbox,TableHead,TableRow,FormControl,Select,MenuItem,Avatar,IconButton,Box,Button,TextField,Theme,Grid,Typography,Paper,colors} from '@material-ui/core'
import {Helmet} from 'react-helmet'
import {RootState} from '../store'
import {ResetResult} from '../store/system/actions'
import {Combination,User,BundleCombination} from '../store/app/types'
import {GetExcel,GetParticipantsWithName,GetCombinationData,GetCompetition,PostCombinationData} from '../store/app/api'
import {getSexNumber,getAge,getSex,dateFormatwithTime,getInOut,getName,dateFormat,getAvatar} from '../util/util'
import querystring from 'query-string'
import EditIcon from '@material-ui/icons/Edit'
import BlockIcon from '@material-ui/icons/Block'
import DeleteIcon  from '@material-ui/icons/Delete'
import CloseIcon  from '@material-ui/icons/Close'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import Alert from '@material-ui/lab/Alert'
import _ from 'lodash'

type ColorStyle = {
    color:string
}

type ParticipantSelect = {
  status: number
  user:User
  select: boolean
}

type SelectColumn = {
  index:number  
  column: string
}

interface Props extends ReduxType,RouteComponentProps,WithStyles<typeof styles>{}
type State = {
  error: {
    flag:boolean
    message:string
  }
  combi_open:boolean
  open: boolean
  editable:boolean[]
  selectUsers: ParticipantSelect[]
  combinations: Combination[]
  selectColumn:SelectColumn
}

const styles = (theme:Theme) => createStyles({
  root: {
  },
  table: {
    whiteSpace:"nowrap",
    overflowX: "scroll",
    minWidth:650,
  },
  header: {
    '& > *': {
        fontWeight:600,
        fontSize: 12,
      }
  },
  body: {
    '& > *': {
        fontSize: 13,
      }
  },
  check: {
        color: theme.palette.grey[400],
        '&$checked': {
          color: theme.palette.primary.main
        }
  },
  formLabel: {
    color: theme.palette.grey[900],
    fontSize: 16,
    '&.Mui-focused': {
       color:theme.palette.primary.main
     }
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

class CompeManagement extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props)
    this.state = {
      error: {
        flag:false,
        message:""
      },
      combi_open:false,
      selectColumn: {} as SelectColumn,
      open:false,
      editable: [] as boolean[],
      selectUsers: [] as ParticipantSelect[],
      combinations: [] as Combination[],
    }
  }
  componentDidMount() {
   let parse = querystring.parse(this.props.location.search)
   let cid = parse.cid === undefined ? 0 : Number(parse.cid)
   this.props.getCombinations(cid)
   this.props.getParti(cid)
   this.props.getCompe(cid)
  }
  componentDidUpdate(Prov:Props) {
    if ((Prov.combinations !== this.props.combinations) || (Prov.participants !== this.props.participants)
      || (Prov.competition !== this.props.competition)) {
      //初期化editable
      let temp:boolean[] = [] as boolean[]
      let parti:ParticipantSelect[] = [] as ParticipantSelect[]
      if (this.props.combinations.payload !== undefined) {
        this.props.combinations.payload.forEach((_,index)=> {
        temp.push(false)
        })
        //初期化participant 
        this.props.participants.forEach((val) => {
          parti.push({
            status: val.status,
            user:val.user,
            select:this.props.combinations.payload.some(
            (e) => e.member1 === val.user_id || e.member2 === val.user_id || e.member3 === val.user_id || e.member4 === val.user_id)
            })
        })
        this.setState(
        {
          editable: temp,
          combi_open: this.props.combinations.combination_open,
          combinations:_.cloneDeep(this.props.combinations.payload),
          selectUsers:parti
        })
      } else {
        this.props.participants.forEach((val) => {
          parti.push({
            status: val.status,
            user:val.user,
            select:false,
            })
        })
        this.setState(
        {
          editable: temp,
          combi_open: this.props.combinations.combination_open,
          combinations:[],
          selectUsers:parti
        })
      }
    }
  }
  componentWillUnmount() {
    this.props.resetLog()
  }
  handleEdit(e:React.MouseEvent<HTMLElement>) {
    const id = e.currentTarget.getAttribute("data-id")
    const {editable} = this.state
    if (id !== null) {
      editable[Number(id)] = !editable[Number(id)] 
    }
    this.setState({editable:editable})
  }
  handleDel(e:React.MouseEvent<HTMLElement>) {
    const idx= e.currentTarget.getAttribute("data-id")
    const {combinations,selectUsers} = this.state
    let users:number[]  = []
    if (idx !== null) {
      const i = Number(idx)
      if (combinations[i].member1 != null ) users.push(Number(combinations[i].member1))
      if (combinations[i].member2 != null ) users.push(Number(combinations[i].member2))
      if (combinations[i].member3 != null ) users.push(Number(combinations[i].member3))
      if (combinations[i].member4 != null ) users.push(Number(combinations[i].member4))
      users.forEach((uid) => {
        selectUsers.forEach((val) => {
          if (val.user.id === uid) {
            val.select = false
          }
        })
      })
      const newData = combinations.filter((_,index) => index !== i )
      this.setState({
        combinations:newData,
        selectUsers:selectUsers
      })
    }
  }
  handleInOut(idx:number,d:number) {
   const {combinations}  = this.state
   combinations[idx].start_in_out = d
   this.setState({
     combinations:combinations
   })
  }
  handleStime(idx:number,d:string) {
    const {combinations} = this.state
    combinations[idx].start_time = new Date(d)
    this.setState({
      combinations:combinations
    })
  }
  SelectParti(e:React.MouseEvent<HTMLElement>) {
    const uid = e.currentTarget.getAttribute("data-id")
    const {combinations,selectUsers,selectColumn} = this.state
    if (uid !== null) {
      switch (selectColumn.column) {
        case "member1":
         combinations[selectColumn.index].member1 = Number(uid)
         break
        case "member2":
         combinations[selectColumn.index].member2 = Number(uid)
         break
        case "member3":
         combinations[selectColumn.index].member3 = Number(uid)
         break
        case "member4":
         combinations[selectColumn.index].member4 = Number(uid)
         break
      }
      selectUsers.forEach((val) => {
        if (val.user.id === Number(uid)) {
          val.select = true
        }
      })
      selectColumn.column = ""
      selectColumn.index = 0
      this.setState({
        open:false,
        combinations:combinations,
        selectUsers:selectUsers,
        selectColumn:selectColumn
      })
    }
  }
  handleSelect(e:React.MouseEvent<HTMLElement>,s:string) {
    this.setState({
      selectColumn: {
        index:Number(e.currentTarget.getAttribute("data-id")),
        column:s
      },
      open:true
    })
  }
  handleSelectDel(idx:number,s:string) {
    const {combinations,selectUsers} = this.state
    let tmp:number | null = null 
    if (idx !== null) {
      switch (s) {
        case "member1":
         tmp = combinations[idx].member1
         combinations[idx].member1 = null
         break
        case "member2":
         tmp = combinations[idx].member2
         combinations[idx].member2 = null
         break
        case "member3":
         tmp = combinations[idx].member3
         combinations[idx].member3 = null
         break
        case "member4":
         tmp = combinations[idx].member4
         combinations[idx].member4 = null
         break
      } 
      selectUsers.forEach((val) => {
         if (val.user.id === tmp) {
           val.select =  false
         }
      })
      this.setState({
        combinations:combinations,
        selectUsers:selectUsers
      })
    }
  }
  check():boolean {
    const {combinations} = this.state
    const {participants} = this.props
    let users:number[] = [] as number[]
    combinations.forEach((val) => {
      if (val.member1 != null) {
        users.push(val.member1)
      }
      if (val.member2 != null) {
        users.push(val.member2)
      }
      if (val.member3 != null) {
        users.push(val.member3)
      }
      if (val.member4 != null) {
        users.push(val.member4)
      }
    })
    //参加者チェック
    let not_sanka:boolean = false
    users.forEach((val) => {
      let result = participants.find((v) => v.user_id === val && v.status === 1)
      if (result === undefined) {
        this.setState({
          error: {
            flag:true,
            message: "参加データがないか、ステータス「参加」以外の者が含まれています" 
          }
        })
        not_sanka = true
      }
    })

    if (not_sanka) return false
    this.setState({
      error: {
        flag:false,
        message:""
        }
    })
    return true
  }
  getStyle(uid:number | null):ColorStyle {
   const num =  getSexNumber(this.props.participants,uid)
   const style:ColorStyle = {
     color:"#000"
   }
   if (num === 0) {
    style.color = colors.grey[800]
   }
   if (num === 1) {
     style.color = colors.blue[800]
   }
   if (num === 2) {
     style.color = colors.red[800]
   }
   return style
  }
  send() {
    if (this.check()) {
      let cid = this.props.competition.id === undefined ? 0:this.props.competition.id
      let data:BundleCombination = {
        open: this.state.combi_open,
        transaction: this.state.combinations
      }
      this.props.postCombinations(data,cid)
    }
  }
  addkumi() {
    const {combinations,editable} = this.state
    const {competition} = this.props
    combinations.push({
      id:0,
      start_in_out:2,
      competition_id:competition.id,
      start_time: competition.event_day == null ? new Date(): competition.event_day,
      member1:null,
      member2:null,
      member3:null,
      member4:null,
      update_at:null,
    })
   editable.push(false)
   this.setState({
     combinations:combinations,
     editable:editable
   }) 
  }
  render() {
    const {classes,system,participants} = this.props
    const {selectUsers,combinations,editable,error} = this.state
    const selectValues = selectUsers.filter((val) => val.status === 1 && val.select === false)
    return (
      <Grid container direction="row" justify="flex-start" spacing={1}>
            <div className="CompeManagement">
              <Helmet>
                <title>ペアリング管理</title>
              </Helmet>
            </div>
          <Grid item xs={12} sm={12}>
            <Typography variant="h1" style={{marginBottom:"10px"}}>
              ペアリング管理
            </Typography>
            <Typography variant="caption">
              ペアリングを作成することができます。作成したデータはエクセルファイルでダウンロードすることができます。コンペの際に
              ご利用ください。 
            </Typography>
          </Grid>
          {  error.flag &&
          <Grid item xs={12} sm={12}>
              <Alert severity="error">{ error.message }</Alert>
          </Grid>
          }
          <Grid item xs={12} sm={12}>
           <TableContainer elevation={0} component={Paper} style={{width:"100%"}}>
              <Table size="medium" className={classes.table} >
                <TableHead>
                  <TableRow className={classes.header} >
                    <TableCell>
                      <IconButton edge="start" size="small" onClick={(e) => this.addkumi()}>
                        <AddCircleOutlineIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">スタート時間</TableCell>
                    <TableCell align="right">IN/OUT</TableCell>
                    <TableCell align="right">メンバー1</TableCell>
                    <TableCell align="right">メンバー2</TableCell>
                    <TableCell align="right">メンバー3</TableCell>
                    <TableCell align="right">メンバー4</TableCell>
                  </TableRow>
                </TableHead>
         {!system.loading.combinations && !system.loading.participants && !system.loading.competition && combinations.length > 0 && 
         <TableBody>
           { combinations.map((val,index) => ( 
              <TableRow className={classes.body}>
                <TableCell component="th" scope="row">
                  <IconButton edge="start" data-id={index} size="small" onClick={(e) => this.handleDel(e)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton edge="end" style={{marginLeft:10}} data-id={index} size="small" onClick={(e) => this.handleEdit(e)}>
                  { !editable[index] &&
                   <EditIcon/>
                  }
                  { editable[index] &&
                   <BlockIcon/>
                  }
                  </IconButton>
                </TableCell>
                { !editable[index] &&
                <>
                <TableCell align="right">{dateFormatwithTime(val.start_time)}</TableCell>
                <TableCell align="right">{getInOut(val.start_in_out)}</TableCell>
                <TableCell align="right" style={this.getStyle(val.member1)}>{getName(participants,val.member1)}</TableCell>
                <TableCell align="right" style={this.getStyle(val.member2)}>{getName(participants,val.member2)}</TableCell>
                <TableCell align="right" style={this.getStyle(val.member3)}>{getName(participants,val.member3)}</TableCell>
                <TableCell align="right" style={this.getStyle(val.member4)}>{getName(participants,val.member4)}</TableCell>
                </>
                }
                { editable[index] &&
                <>
                <TableCell align="right">
                   <TextField
                    id="Helddate"
                    type="datetime-local"
                    variant="standard"
                    value={dateFormat(val.start_time)}
                    onChange={(e) => this.handleStime(index,e.target.value)} 
                    InputLabelProps={{
                      className:classes.formLabel,
                      shrink:true
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                     <FormControl className={classes.formControl}>
                          <Select
                            value={val.start_in_out}
                            onChange={(e) => this.handleInOut(index,Number(e.target.value))}
                          >
                            <MenuItem value={1}>IN</MenuItem>
                            <MenuItem value={2}>OUT</MenuItem>
                          </Select>
                      </FormControl>
                </TableCell>
                <TableCell align="right">
                 { val.member1 !== null &&
                 <Chip 
                    avatar={<Avatar src={getAvatar(participants,val.member1)} />}
                    label={getName(participants,val.member1)}
                    variant="outlined"
                    style={this.getStyle(val.member1)}
                    onDelete={(e) => this.handleSelectDel(index,"member1")}/>
                 }
                 { val.member1 == null &&
                   <IconButton edge="start" data-id={index} size="small" onClick={(e) => this.handleSelect(e,"member1")}>
                      <AddCircleOutlineIcon />
                   </IconButton>
                 }
                </TableCell>
                <TableCell align="right">
                { val.member2 !== null &&
                 <Chip 
                    avatar={<Avatar src={getAvatar(participants,val.member2)} />}
                    variant="outlined"
                    style={this.getStyle(val.member2)}
                    label={getName(participants,val.member2)}
                    onDelete={(e) => this.handleSelectDel(index,"member2")}/>
                 }
                 { val.member2 == null &&
                   <IconButton edge="start" data-id={index} size="small" onClick={(e) => this.handleSelect(e,"member2")}>
                      <AddCircleOutlineIcon />
                   </IconButton>
                 }
                </TableCell>
                <TableCell align="right">
                { val.member3 !== null &&
                 <Chip 
                    avatar={<Avatar src={getAvatar(participants,val.member3)} />}
                    variant="outlined"
                    style={this.getStyle(val.member3)}
                    label={getName(participants,val.member3)}
                    onDelete={(e) => this.handleSelectDel(index,"member3")}/>
                 }
                 { val.member3 == null &&
                   <IconButton edge="start" data-id={index} size="small" onClick={(e) => this.handleSelect(e,"member3")}>
                      <AddCircleOutlineIcon />
                   </IconButton>
                 }
                </TableCell>
                <TableCell align="right">
                { val.member4 !== null &&
                 <Chip 
                    avatar={<Avatar src={getAvatar(participants,val.member4)} />}
                    label={getName(participants,val.member4)}
                    variant="outlined"
                    style={this.getStyle(val.member4)}
                    onDelete={(e) => this.handleSelectDel(index,"member4")}/>
                 }
                 { val.member4 == null &&
                   <IconButton edge="start" data-id={index} size="small" onClick={(e) => this.handleSelect(e,"member4")}>
                      <AddCircleOutlineIcon />
                   </IconButton>
                 }
                </TableCell>
                </>
                }
            </TableRow>
             ) 
           )}
        </TableBody>
        }
              </Table>
           </TableContainer>
          <Box m={2}>
            <FormControlLabel  
              control={
                <Checkbox
                className={classes.check}
                name="twitter"
                onChange={(e) => this.setState({
                  combi_open:e.target.checked
                })}
                checked={this.state.combi_open}
                color="primary"
                />
              }
              label="公開する"/>
          </Box>
          <Box m={2}>
                <Button color="primary" disabled={
                  (JSON.stringify(combinations) === JSON.stringify(this.props.combinations.payload)) && 
                  (this.state.combi_open === this.props.combinations.combination_open)
                }
                style={{color:"#fff",fontWeight:700}} onClick={() => this.send()}
                variant="contained" disableElevation >
                  保存する 
                </Button>
                <Button style={{color:"#fff",fontWeight:700,marginLeft:20}} color="secondary" 
                disabled={this.props.combinations.payload === undefined || system.loading.excel } variant="contained" disableElevation 
                onClick={()=> this.props.getExcel(this.props.competition.id)}>
                ダウンロード
                </Button>
          </Box>
          </Grid>
          <Dialog open={this.state.open} fullScreen>
            <DialogTitle id="dialog" style={{fontWeight:"bold"}}>
              <IconButton edge="start" onClick={()=> {
                this.setState({open:false})
              }}>
                <CloseIcon/>
              </IconButton>
              参加者選択
            </DialogTitle>
            <DialogContent dividers>
            <List>
                { selectValues.map(val => ( 
                  <ListItem button data-id={val.user.id} key={val.user.id} divider alignItems="center" onClick={(e) => this.SelectParti(e) } >
                    <ListItemAvatar>
                      <Avatar 
                        src={val.user.avatar} />
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
                    <ListItemText primary={
                       <React.Fragment>
                        <Typography variant="h4" style={{marginRight:10}}>
                          {getSex(val.user.sex)}
                        </Typography>
                       </React.Fragment>
                     }
                     />
                     <ListItemText primary={
                       <React.Fragment>
                        <Typography variant="h4">
                          {getAge(val.user.birthday)}
                        </Typography>
                       </React.Fragment>
                     }
                     />
                  </ListItem>
                  ) 
                )}
              </List>
            </DialogContent>
          </Dialog>
      </Grid>
    )
  }
}


const mapStateToProps = (state:RootState) => {
  return {
    participants:state.app.participants,
    combinations:state.app.combinations,
    competition:state.app.competition,
    system: state.system
  }
}

const mapDispatchProps = (dispatch:Dispatch) => {
  return {
    getCompe(cid:number) {
      GetCompetition(cid)(dispatch)
    },
    getParti(cid:number){
      GetParticipantsWithName(cid)(dispatch)
    },
    postCombinations(data:BundleCombination,cid:number){
      PostCombinationData(data,cid)(dispatch)
    },
    getCombinations(cid:number) {
      GetCombinationData(cid)(dispatch)
    },
    getExcel(cid:number) {
      GetExcel(cid)(dispatch)
    },
    resetLog(){
      dispatch(ResetResult())
    }
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchProps>


export default connect(mapStateToProps,mapDispatchProps)(withRouter(withStyles(styles,{withTheme:true})(CompeManagement)))
