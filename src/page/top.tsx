import React from 'react'
import {RouteComponentProps,withRouter} from 'react-router-dom'
import {List,ListItem,Grid,Container,Theme} from '@material-ui/core'
import EventCard from '../components/EventCard'
import {Typography,Divider,Button,Box} from '@material-ui/core'
import {createStyles,withStyles,WithStyles} from '@material-ui/styles'
import TwitterIcon from '@material-ui/icons/Twitter'

interface Props extends RouteComponentProps,WithStyles<typeof styles>{}
type State = {}

const styles = (theme:Theme) => createStyles({
  root: {
    paddingTop: "50px"
  },
    button: {
    marginTop: theme.spacing(3),
    color: theme.palette.common.white,
    fontWeight:700
  },
  main: {
    [theme.breakpoints.up("sm")]: {
      borderRightColor: theme.palette.divider,
      borderRightWidth: "1px",
      borderRightStyle: "solid",
      paddingRight:theme.spacing(3)
    },
  },
  sug: {
    '& > *': {
      margin:theme.spacing(2)
    },
    textAlign: "center",
    marginTop: theme.spacing(2)
  },
  subtitle: {
    fontWeight:700,
    color:"#2a2b52",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.0rem"
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.7rem"
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.8rem"
    }
  },
  toolbar: theme.mixins.toolbar,
}) 


class Top extends React.Component<Props,State> {
  constructor(props:any) {
    super(props)
  }
  linkTo() {
    this.props.history.push("/events")
  }
  render() {
    const {classes} = this.props
    return (
      <Container maxWidth={"md"}>
      <div className={classes.toolbar}/>
        <Grid container alignItems="center" justify="center" className={classes.root}>
          <Grid sm={12}>
          <Typography className={classes.subtitle} align="center" > 
            イベント告知・出席管理をより簡単に
          </Typography>
          </Grid>
          <Grid sm={12} style={{marginTop:"20px"}}>
           <Typography  align="center" > 
            ゴルフイベント告知管理サイト
          </Typography>
          </Grid>
                  <div className={classes.sug}>
          <Button size="large" className={classes.button} variant="contained"  color="primary" startIcon={<TwitterIcon/>}>ログイン</Button>
          <Button size="large"  variant="contained" onClick={()=>{this.linkTo()}} >続きを見る</Button>
        </div>
          <Grid container style={{marginTop:"20px"}} spacing={2}>
            {[1,2,3,4,5,6].map((i) => (
            <Grid xs={12} sm={4} key={i} item >
              <EventCard />
            </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
    )
  }
}

export default withRouter(withStyles(styles,{withTheme:true})(Top))
