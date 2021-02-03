import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import {createStyles,Theme,withStyles,WithStyles} from '@material-ui/core/styles'
import EventCard from '../components/EventCard'
import {List,ListItem} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import {withRouter,RouteComponentProps} from 'react-router-dom'

interface Props extends RouteComponentProps,WithStyles<typeof styles> {}

type State = {
  tabIndex: number
}

const styles = (theme:Theme) => createStyles({
  root: {
    flexGrow:1,
    backgroundColor: theme.palette.background.default,
  },
  container: {
    [theme.breakpoints.down("sm")]: {
      padding: 0 
    }
  },
  select :{
    fontSize:"1.1em",
    fontWeight:700,
    color: theme.palette.grey[500],
  }
})

class All extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props)
    this.state = {
      tabIndex: 0 
    }
  }
  handeleChange(event:React.ChangeEvent<{}>,newIndex:number) {
    this.setState({tabIndex:newIndex})
  }
  render() {
    const {tabIndex} = this.state
    const {classes}  = this.props
    return (
    <Container maxWidth={"md"}  className={classes.container}> 
      <Grid item sm={12}>
        <Typography variant="h1" style={{marginBottom:"20px"}}>
           みんなのイベント
        </Typography>
      </Grid>
      <Grid item sm={12} >
          <Tabs 
            value={tabIndex}
            textColor="primary"
            indicatorColor="primary"
            variant="fullWidth"
            onChange={(e,val)=> this.handeleChange(e,val)}
          >
          <Tab label="最新" value={0} className={classes.select} />
          <Tab label="開催日" value={1} className={classes.select}/>
          <Tab label="締め切り" value={2} className={classes.select}/>
          </Tabs>
      </Grid>
      <Grid container style={{marginTop:"20px"}} spacing={2}>
            {[1,2,3,4,5,6].map((i) => (
            <Grid xs={12} sm={4} key={i} item >
              <EventCard />
            </Grid>
            ))}
      </Grid>
     </Container>
    )
  }
}

export default withRouter(withStyles(styles,{withTheme:true})(All))