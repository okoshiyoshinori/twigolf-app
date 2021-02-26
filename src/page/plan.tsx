import React from 'react'
import {RouteComponentProps,withRouter} from 'react-router-dom'
import {withStyles,WithStyles,createStyles} from '@material-ui/styles'
import {Theme,Divider,Paper} from '@material-ui/core'
import {Container,Button,List,ListItem,ListItemAvatar,ListItemText,Avatar,Grid,Tabs,Tab,Card,Typography} from '@material-ui/core'
import EventList from '../components/eventlist'
import {UserInfo} from '../store/user/types'

interface Props extends RouteComponentProps,WithStyles<typeof styles>{}

type State = {
  tabindex:number
  uinfo : UserInfo
}

const styles = (theme:Theme) => createStyles({
  root: {
  },
  paper: {
    padding:"15px",
    borderRadius: "10px"
  },
  container: {
  },
  back: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "8px"
  },
  select :{
    fontSize: "1.0rem",
    fontWeight:700,
    color: theme.palette.grey[700]
  },
  selected: {
    color:"#0069c0"
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5)
  }
})

class Plan extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props)
    this.state = {
      tabindex:0,
      uinfo: {
        uid: "ddd",
        screen_name:"nanahara",
        email: "ookoshi@oopo.jp",
        sns_id: "@kasuhara",
        password: "",
        avatar: "nanahara.jpg",
        description: "アカウントはこれしかありません。ネット配信をこよなく愛する、かまってほしい子 。リプサボり魔ごめん",
        login_type:"TWITTER"
      }
    }
  }
  handeleChange(e:React.ChangeEvent<{}>,val:number) {
    this.setState({tabindex:val})
  }
  render() {
    const {classes} = this.props
    const {tabindex,uinfo} = this.state
    return (
    <Grid container spacing={2} direction="row" justify="flex-start" >
     <Grid item xs={12} sm={12}>
     <Typography variant="h1" style={{marginBottom:"10px"}}>
       {uinfo.screen_name} さんのマイページ 
      </Typography >
      <Paper variant="outlined" className={classes.paper} >
      <List>
                  <ListItem style={{padding:0}} alignItems="flex-start">
                   <ListItemAvatar style={{minWidth:50}}> 
                    <Avatar src={process.env.PUBLIC_URL + "/nanahara.jpg"} aria-label="event" className={classes.avatar}/>
                   </ListItemAvatar> 
                   <ListItemText 
                  primary={<Typography variant="h3">{uinfo.sns_id}</Typography>}
                  secondary={<Typography variant="body2">{uinfo.description}</Typography>}/>
                  </ListItem>
      </List>
      <Button variant="contained" onClick={()=> this.props.history.push("/creation")} disableElevation color="primary" style={{color:"#fff",fontWeight:700}} >
      イベント作成
      </Button>
                 <Tabs style={{marginBottom:"10px",borderBottom:"2px solid #dfdfdf"}} 
              value={tabindex}
              textColor="inherit"
              variant="standard"
              centered
              onChange={(e,val)=> this.handeleChange(e,val)}
            >
              <Tab label="今後" value={0} />
              <Tab label="過去" value={1} />
              <Tab label="未定" value={2} />
            </Tabs>
            {
               [1,2,3,4].map((i) => (
                <EventList editable={false} />
              ))
            }
            </Paper>
     </Grid>
    </Grid>
    )
  }
}

export default withRouter(withStyles(styles,{withTheme:true})(Plan))
