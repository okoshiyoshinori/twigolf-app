import React from 'react'
import {createStyles,Theme,withStyles,WithStyles} from '@material-ui/core/styles/'
import {Chip,colors,Card,CardActions,IconButton,CardActionArea,CardHeader,CardContent,Avatar,Typography} from '@material-ui/core/'
import {withRouter,RouteComponentProps} from 'react-router-dom'
import {Competition} from '../store/app/types'
import {Session} from '../store/session/types'
import {dataFormatwithday,dayEditor} from '../util/util'
import EventIcon from '@material-ui/icons/Event'
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
    height:"3.5rem",
  },
  headerTitle: {
      display:"-webkit-box",
      boxOrient:"vertical",
      lineHeight:"1.5rem",
      overflow:"hidden",
      lineClamp:2,
  },
  place: {
      display:"-webkit-box",
      boxOrient:"vertical",
      overflow:"hidden",
      marginLeft:5,
      lineClamp:1
  },
  contents: {
    color: theme.palette.common.black,
    backgroundColor: theme.palette.common.white,
  },
  actions: {
    paddingLeft: theme.spacing(2),
    backgroundColor: theme.palette.common.white,
  },
  avatar: {
    width:40,
    height:40,
    padding:2,
    background:colors.grey[100],
    borderRadius: "50%",
    margin:'auto',
    '& > img': {
        borderRadius: "50%"
      }
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  }
})

class EventCard extends React.Component<Props,State> {
  render() {
    const {classes,data,session,handler} = this.props
    const close = data.status === 0 || dayEditor().isAfter(dayEditor(data.event_deadline)) || 
          dayEditor().isAfter(dayEditor(data.event_day))  ? true:false 
    return (
      <Card className={classes.root} elevation={0} variant="outlined">
        <CardActionArea disableRipple disableTouchRipple onClick={()=> this.props.history.push("/events/" + data.id)}>
          <CardHeader className={classes.header} avatar={
            <Avatar src={data.user.avatar} aria-label="event" className={classes.avatar}>
            </Avatar>
          }
          title={<Typography  variant="h4" component="p" className={classes.headerTitle}>{data.title}</Typography>}
          action={
           <>
            { session !== undefined && data !== undefined && handler !== undefined && data.user_id === session.auth.id && 
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
               <div style={{display: 'flex',alignItems: 'left',flexWrap: 'nowrap',}}>
                 <PlaceIcon style={{fontSize:"1.0rem",color:colors.grey[600]}}/>
                 <span className={classes.place}>
                  {data.place_text === null ? "未定" : data.place_text}
                 </span>
                 </div>
          </Typography>
          <Typography variant="caption">
               <div style={{display: 'flex',alignItems: 'center',flexWrap: 'nowrap',}}>
                 <EventIcon style={{fontSize:"1.0rem",color:colors.grey[600]}}/>
                 <span className={classes.place}>
                  {data.event_day === null ? "未定": dataFormatwithday(data.event_day)} 
                 </span>
               </div>
          </Typography>
        </CardContent>
        <CardActions className={classes.actions}>
        <Chip 
          label={close ? "受付終了": "受付中"} size="small"
          variant="outlined"
          style={close ? {color:colors.red[700],borderColor:colors.red[700],fontWeight:"bold"}:{color:colors.blue[700],borderColor:colors.blue[700],
          fontWeight:"bold"}}
        />
        <Typography variant="caption">
          {dayEditor().to(dayEditor(data.update_at))}
        </Typography>
        </CardActions>
      </CardActionArea>
     </Card>
    )
  }
}

export default withRouter(withStyles(styles,{withTheme:true})(EventCard))
