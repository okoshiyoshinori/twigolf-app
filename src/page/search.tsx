import React from 'react'
import {FormControl,Button,TextField,FormLabel,FormControlLabel,Radio,RadioGroup,InputLabel,Typography,Grid,Paper,Select,MenuItem} from '@material-ui/core'
import {withRouter,RouteComponentProps} from 'react-router-dom'
import {createStyles,Theme,withStyles,WithStyles} from '@material-ui/core/styles'
import {dateFormatNotime,SearchLog} from '../util/util'
import EventList from '../components/eventlist'
import {SearchCompetition} from '../store/app/api'
import Progress from '../components/progress'
import Message from '../components/message'
import {RootState} from '../store'
import {connect} from 'react-redux' 
import {Dispatch} from 'redux'
import {ResetResult} from '../store/system/actions'
import querystring from 'query-string'

interface Props extends ReduxProps,RouteComponentProps,WithStyles<typeof styles>{}

type State = {
  p:string
  mode:string
  date:string
  dis:boolean
  keyword:string
}

const styles = (theme:Theme)=> createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
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
//search?p=x&date=yyyy-mm-dd&mode=x
class Search extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props)
    this.state = this.parseQuery(props)
  }
  execute() {
    this.props.history.push({
        search:`?mode=${this.state.mode}&q=${this.state.keyword}&p=${this.state.p}&date=${this.state.date}&k=${Date.now()}`
    })
  }
  componentDidUpdate(prevProps:Props) {
    if (this.props.location.search !== prevProps.location.search) {
       this.props.resetLog()
       let parse = this.parseQuery(this.props)
       this.setState({
         mode:parse.mode,
         date:parse.date,
         keyword:parse.keyword,
         p: parse.p,
         dis: parse.mode == "1"? true:false
       })
       const {date,mode,dis,keyword} = parse 
       const inputdate = date == "" ? null: date
       const inputmode = Number(mode)
       this.props.search(0,keyword,inputdate,inputmode)
    }
  }
  componentWillUnmount() {
    this.props.resetLog()
  }
  parseQuery(props:Props):State{
    const parse = querystring.parse(props.location.search)
    let mode:string = parse.mode === undefined ? "1": parse.mode as string
    let p:string = parse.p === undefined ? "0": parse.p as string
    let date:string = parse.date === undefined ? dateFormatNotime(new Date()): parse.date as string
    let keyword:string = parse.q === undefined ? "": parse.q as string
    return {
      mode:mode,
      p:p,
      date:date,
      dis: mode === "1" ? true: false,
      keyword:keyword
    }
  }
  handleRadio(e:React.ChangeEvent<{}>) {
    if ((e.target as HTMLInputElement).value === '1') {
      this.setState({
        mode: "1",
        dis: true
      })
    } else {
      this.setState({
        mode: "2",
        dis: false
      })
    }
  }
  render() {
    const {classes,competitions,system} = this.props
    const searchResult = SearchLog(system.result,"search")
    return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <Typography variant="h1">
          検索
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Paper elevation={0} variant="outlined" style={{borderRadius:10,padding:15}}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
            <FormControl component="fieldset">
                <FormLabel component="legend" className={classes.formLabel}>日付</FormLabel>
                  <RadioGroup row  value={this.state.mode} onChange={(e)=>this.handleRadio(e)}>
                    <FormControlLabel 
                      control={<Radio color="default"/>}
                      value="1"
                      labelPlacement="end"
                      label="指定"
                     />
                     <FormControlLabel 
                      control={<Radio color="default"/>}
                      labelPlacement="end"
                      value="2"
                      label="未定"
                     />
                  </RadioGroup>
                </FormControl>
            </Grid>
            {
              this.state.dis &&
            <Grid item xs={12} sm={12}>
              <TextField
               id="date"
               label="開催日"
               type="date"
               value={this.state.date}
               helperText="※選択日以降のイベントを表示します"
               FormHelperTextProps={{
                 className:classes.helperTxt
               }}
               onChange={(e)=>this.setState({date:e.target.value})}
               InputLabelProps={{
               shrink: true,
               className: classes.formLabel
               }}
             />
            </Grid>
            }
            <Grid item xs={12} sm={12}>
             <TextField
              label="キーワード"
              fullWidth
              value={this.state.keyword}
              onChange={(e)=>this.setState({keyword:e.target.value})}
              InputLabelProps={{
                shrink: true,
                className: classes.formLabel
              }}
              id="filled-size-small"
             />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button
              disableElevation
              disabled={system.loading.search ? true:false}
              color="primary"
              variant="contained"
              style={{color:"#fff",fontWeight:700}}
              onClick={()=>this.execute()}>
              検索する
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={12} >
        {searchResult.status !== 200 && <Message mes={searchResult.cause}/>}
        {system.loading.search && <Progress/>}
        {!system.loading.search && searchResult.status === 200 && 
        <Paper elevation={0} variant="outlined" >
          <EventList data={competitions.payload} editable={false}/>
        </Paper>
        }
      </Grid>
    </Grid>
    )
  }
}

const mapStateToProps = (state:RootState) => {
  return {
    competitions: state.app.searchresult,
    system:state.system
  } 
}

const mapDispatchToProps = (dispatch:Dispatch) => {
  return {
    search(p:number,q:string | null,day:string | null,mode:number) {
      SearchCompetition(p,q,day,mode)(dispatch)
    },
    resetLog(){
      dispatch(ResetResult())
    }
  }

}
type ReduxProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withStyles(styles,{withTheme:true})(Search)))
