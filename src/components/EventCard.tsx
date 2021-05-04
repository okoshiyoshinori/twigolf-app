import React from 'react'
import {createStyles,Theme,withStyles,WithStyles} from '@material-ui/core/styles/'
import {colors,Card,CardActions,IconButton,CardActionArea,CardMedia,CardHeader,CardContent,Avatar,Typography,Divider} from '@material-ui/core/'
import { red } from '@material-ui/core/colors'
import {withRouter,RouteComponentProps} from 'react-router-dom'
import {Competition} from '../store/app/types'
import {Session} from '../store/session/types'
import {dataFormatwithday,dayEditor} from '../util/util'
import EventIcon from '@material-ui/icons/Event'
import AlarmOnIcon from '@material-ui/icons/AlarmOn'
import PlaceIcon from '@material-ui/icons/Place'
import MoreVertIcon from '@material-ui/icons/MoreVert'


type handleProps = (e:React.MouseEvent<HTMLElement>) => void

interface Props extends RouteComponentProps,WithStyles<typeof styles>{
  data:Competition
  session?:Session
  handler?: handleProps 
}


type State = {}

const styles = (theme:Theme) => createStyles({
  root: {
    backgroundColor: theme.palette.background.default,
    borderRadius: "10px",
    //boxShadow: "0 0 0 0",
    /*
    [theme.breakpoints.up("sm")]: {
      maxWidth:"350px"
    }
    */
  },
  day: {
    color:theme.palette.primary.dark,
    marginBottom:"10px"
  },
  fotter: {
    color: theme.palette.common.black,
    backgroundColor: theme.palette.common.white,
  },
  header: {
    color: theme.palette.common.black,
    backgroundColor: theme.palette.common.white,
    paddingBottom:0,
  },
  contents: {
    color: theme.palette.common.black,
    backgroundColor: theme.palette.common.white,
  },
  avatar: {
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(4),
      height: theme.spacing(4)
    },
    [theme.breakpoints.down("sm")]: {
      width: theme.spacing(3),
      height: theme.spacing(3)
    },
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
    const {classes,data,session,handler} = this.props
    const undecided:boolean = data.event_day === null ? true:false
    return (
      <Card className={classes.root} elevation={0} variant="outlined">
        <CardActionArea disableRipple disableTouchRipple onClick={()=> this.props.history.push("/events/" + data.id)}>
          <CardHeader className={classes.header} avatar={
            <Avatar src={process.env.PUBLIC_URL + "/" + data.user.avatar } aria-label="event" className={classes.avatar}>
            </Avatar>
          }
          title={<Typography  variant="h3" style={{lineHeight:"1.4em"}}>{data.title}</Typography>}
          action={
           <>
            { session != undefined && data != undefined && handler != undefined && data.user_id == session.auth.id && 
            <IconButton size="small" aria-controls={"menu" + data.id}  aria-haspopup="true" aria-label="settings" data-id={data.id}
            onClick={(e) =>  handler(e)}>
              <MoreVertIcon  />
            </IconButton>
            }
            </>
          }
         />
        <CardContent className={classes.contents}>
          <Typography variant="caption">
               <div style={{display: 'flex',alignItems: 'center',flexWrap: 'nowrap',}}>
                 <PlaceIcon style={{fontSize:"1.0rem",color:colors.grey[600]}}/>
                 <span style={{marginLeft:5}}>
                  {data.place_text == null ? "未定" : data.place_text}
                 </span>
                 </div>
          </Typography>
          <Typography variant="caption">
               <div style={{display: 'flex',alignItems: 'center',flexWrap: 'nowrap',}}>
                 <EventIcon style={{fontSize:"1.0rem",color:colors.grey[600]}}/>
                 <span style={{marginLeft:5}}>
                  {data.event_day == null ? "未定": dataFormatwithday(data.event_day)} 
                 </span>
               </div>
          </Typography>
        </CardContent>
      { /*
      <CardHeader className={classes.header} avatar={
          <Avatar src={process.env.PUBLIC_URL + "/" + data.user.avatar } aria-label="event" className={classes.avatar}>
          </Avatar>
        }
        title={<Typography  variant="caption">{`@${data.user.sns_id}・` }</Typography>}
        subheader={<Typography  variant="caption">{dayEditor().to(dayEditor(data.update_at))}</Typography>}
        action={
           <>
            { session != undefined && data != undefined && handler != undefined && data.user_id == session.auth.id && 
            <IconButton size="small" aria-controls={"menu" + data.id}  aria-haspopup="true" aria-label="settings" data-id={data.id}
            onClick={(e) =>  handler(e)}>
              <MoreVertIcon  />
            </IconButton>
            }
            </>
          }
        />
        */ }
      </CardActionArea>
     </Card>
    )
  }
}

export default withRouter(withStyles(styles,{withTheme:true})(EventCard))
