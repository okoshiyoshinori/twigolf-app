import React from 'react'
import {createStyles,Theme,withStyles,WithStyles} from '@material-ui/core/styles/'
import {Card,CardActionArea,CardMedia,CardHeader,CardContent,Avatar,Typography,Divider} from '@material-ui/core/'
import { red } from '@material-ui/core/colors'
import {withRouter,RouteComponentProps} from 'react-router-dom'
import {Competition} from '../store/app/types'
import {dataFormatwithday,dayEditor} from '../util/util'



interface Props extends RouteComponentProps,WithStyles<typeof styles>{
  data:Competition
}


type State = {}

const styles = (theme:Theme) => createStyles({
  root: {
    backgroundColor: theme.palette.background.default,
    borderRadius: "10px",
    //boxShadow: "0 0 0 0",
    [theme.breakpoints.up("sm")]: {
      maxWidth:"350px"
    }
  },
  day: {
    color:theme.palette.primary.dark,
    marginBottom:"10px"
  },
  header: {
    color: theme.palette.common.black,
    backgroundColor: theme.palette.common.white,
    marginTop:0
  },
  contents: {
    color: theme.palette.common.black,
    backgroundColor: theme.palette.common.white
  },
  avatar: {
    backgroundColor: red[500],
    width: theme.spacing(3),
    height: theme.spacing(3)
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  }
})

class EventCard extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props)
  }
  render() {
    const {classes,data} = this.props
    const undecided:boolean = data.event_day === null ? true:false
    return (
      <Card className={classes.root} elevation={0} variant="outlined">
        <CardActionArea onClick={()=> this.props.history.push("/events/" + data.id)}>
         <CardContent className={classes.contents}>
         <Typography variant="h3" className={classes.day} >
         { undecided ? "日時未定": dataFormatwithday(data.event_day)}
        </Typography>
        <Typography variant="h3" style={{"marginBottom":"10px"}}>
          {data.title} 
        </Typography>
        <Typography variant="h3">
          {data.club_id === 0 ? data.place_text:data.club.name} 
        </Typography>
      </CardContent>
        <CardHeader className={classes.header} avatar={
          <Avatar src={process.env.PUBLIC_URL + "/" + data.user.avatar } aria-label="event" className={classes.avatar}>
          </Avatar>
        }
        title={<Typography style={{fontSize:"11px"}} variant="body2">{`${data.user.screen_name}@${data.user.sns_id}` }</Typography>}
        subheader={<Typography style={{fontSize:"11px"}} variant="body2">{dayEditor().to(dayEditor(data.update_at))}</Typography>}
        />
        </CardActionArea>
     </Card>
    )
  }
}

export default withRouter(withStyles(styles,{withTheme:true})(EventCard))
