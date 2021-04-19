import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import {createStyles,Theme,withStyles,WithStyles} from '@material-ui/core/styles'
import EventCard from '../components/EventCard'
import EventList from '../components/eventlist'
import {List,ListItem} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import {withRouter,RouteComponentProps} from 'react-router-dom'
import {GetCompetitions} from '../store/app/api'
import Progress from '../components/progress'
import Message from '../components/message'
import {RootState} from '../store'
import {connect} from 'react-redux' 
import {Dispatch} from 'redux'
import {ResetResult} from '../store/system/actions'
import querystring from 'query-string'
import {SearchLog} from '../util/util'
import Pagination from '@material-ui/lab/Pagination'
import {Helmet} from 'react-helmet'



interface Props extends ReduxProps,RouteComponentProps,WithStyles<typeof styles> {}

type State = {
  tabIndex: number
  page:number
}

const styles = (theme:Theme) => createStyles({
  root: {
    flexGrow:1,
    backgroundColor: theme.palette.background.default,
  },
  container: {
    [theme.breakpoints.down("sm")]: {
      padding: 0,
      marginBottom:"100px",
    }
  },
  select :{
    fontSize:"1.1em",
    fontWeight:700,
    color: theme.palette.grey[700],
  }
})

class All extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props)
    this.state = this.parseQuery(this.props)
  }
  componentDidMount() {
    this.props.getCompetitions(this.state.page,this.state.tabIndex)
  }
  handeleChange(event:React.ChangeEvent<{}>,newIndex:number) {
    this.setState({tabIndex:newIndex})
    //const {page} = this.parseQuery(this.props)
    this.props.history.push({
      search: `?p=1&sort=${newIndex}`
    })
  }
  handelePage(page:number) {
    this.setState({page:page})
    this.props.history.push({
      search: `?p=${page}&sort=${this.state.tabIndex}`
    })
  }
  parseQuery(props:Props):State {
    const parse = querystring.parse(props.location.search)
    return {
      tabIndex:parse.sort === undefined ? 1: Number(parse.sort),
      page:parse.p === undefined ? 1: Number(parse.p)
    }
  }
  componentDidUpdate(prevProps:Props) {
    if (this.props.location.search !== prevProps.location.search) {
      const {page,tabIndex} = this.parseQuery(this.props) 
      this.setState({
        page:page,
        tabIndex:tabIndex
      })
      this.props.getCompetitions(page,tabIndex)
    }
  }
  componentWillUnmount() {
    this.props.resetLog()
  }
  render() {
    const {tabIndex} = this.state
    const {classes,competitions,system}  = this.props
    const competitionsResult = SearchLog(system.result,"competitions")
    const allPage:number = Math.ceil(competitions.allNumber/Number(process.env.REACT_APP_PERNUM))
    return (
    <Grid container spacing={2}> 
      <div className="All">
        <Helmet>
         <title>みんなのイベント</title>
        </Helmet>
      </div>
      <Grid item xs={12} sm={12}>
        <Typography variant="h1">
           みんなのイベント
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Paper variant="outlined" style={{padding:"15px 15px 0 15px",borderRadius:10}}>
          <Tabs 
            value={tabIndex}
            textColor="inherit"
            indicatorColor="primary"
            variant="fullWidth"
            centered
            onChange={(e,val)=> this.handeleChange(e,val)}
          >
          <Tab label="最新" style={{fontSize:15}}  value={1}/>
          <Tab label="開催日" style={{fontSize:15}} value={2}/>
          <Tab label="締切日" style={{fontSize:15}} value={3}/>
          </Tabs>
        </Paper>
      </Grid>
     {system.loading.competitions && <Progress/>}
     {competitionsResult.status !== 200 && !system.loading.competitions && <Message mes={competitionsResult.cause}/>}
     {competitionsResult.status == 200 && !system.loading.competitions && 
     <>
      <Grid item xs={12} sm={12} md={12}>
        <Paper variant="outlined">
              <EventList data={competitions.payload}/>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Pagination shape="rounded" page={this.state.page} onChange={(e,p) => this.handelePage(p)} count={allPage} boundaryCount={5}/>
      </Grid>
      </>
     }
     </Grid>
    )
  }
}

const mapStateToProps = (state:RootState) => {
  return {
    competitions: state.app.competitions,
    system:state.system
  }
}

const mapDispatchToProps = (dispatch:Dispatch) => {
  return {
    getCompetitions(page:number,sort:number){
      GetCompetitions(page,sort)(dispatch)
    },
    resetLog() {
      dispatch(ResetResult())
    }
  }
}
type ReduxProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withStyles(styles,{withTheme:true})(All)))
