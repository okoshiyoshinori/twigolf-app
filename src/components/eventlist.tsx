import React from 'react'
import {createStyles,Theme,withStyles,WithStyles} from '@material-ui/core/styles/'
import {withRouter,RouteComponentProps} from 'react-router-dom'
import List from '@material-ui/core/List'
import {Menu,MenuItem,colors} from '@material-ui/core/'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import EditIcon from '@material-ui/icons/Edit'
import Avatar from '@material-ui/core/Avatar'
import {Competition} from '../store/app/types'
import {dayEditor,dataFormatwithday} from '../util/util'
import {Session} from '../store/session/types'
import BuildIcon from '@material-ui/icons/Build'
import EventIcon from '@material-ui/icons/Event'
import AlarmOnIcon from '@material-ui/icons/AlarmOn'
import PlaceIcon from '@material-ui/icons/Place'

interface Props extends RouteComponentProps,WithStyles<typeof styles>{
  data:Competition[]
  session?:Session
}
interface State {
  anchorEl:HTMLElement | null
}

const styles = (theme:Theme) => createStyles({
  root: {
    width:"100%",
    backgroundColor: theme.palette.background.paper,
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  },
  inline: {
    display:'inline'
  },
  day: {
    marginBottom:"5px"
  }
})

class EventList extends React.Component<Props,State>{
  constructor(props:Props) {
    super(props)
    this.state = {
      anchorEl:null
    }
  }
  handleClick(id:number) {
    this.props.history.push("/events/" + id)
  }
  handleClose() {
    this.setState({
      anchorEl:null
    })
  }
  handeleLink(to:string) {
    this.props.history.push(to)
  }
  handleEdit(e:React.MouseEvent<HTMLElement>) {
    //this.props.history.push("/creation?cid=" + id)
    this.setState({
      anchorEl:e.currentTarget
    })
  }
  render() {
    const {classes,data,session} = this.props
    return (
    <>
      <List className={classes.root} style={{paddingTop:0,paddingBottom:0}}>
        { data.map((val)=>
          (
          <ListItem key={val.id} divider onClick={()=>this.handleClick(val.id)} style={{padding:15}} button alignItems="flex-start" >
          <ListItemText
            primary={
            <React.Fragment>
               <Typography variant="h2" style={{marginBottom:10}}>
               {val.title}
               </Typography>
               <Typography variant="caption">
               <div style={{display: 'flex',alignItems: 'center',flexWrap: 'nowrap',}}>
                 <EventIcon style={{fontSize:14,color:colors.grey[600]}}/>
                 <span style={{marginLeft:5}}>
                  {val.event_day === null ? "未定": dataFormatwithday(val.event_day)} 
                 </span>
               </div>
               </Typography>
               <Typography variant="caption" component="p">
               <div style={{display: 'flex',alignItems: 'center',flexWrap: 'nowrap',}}>
                 <PlaceIcon style={{fontSize:14,color:colors.grey[600]}}/>
                 <span style={{marginLeft:5}}>
                  {val.place_text == null ? "未定" : val.place_text}
                 </span>
                 </div>
               </Typography>
            </React.Fragment>
            }
            secondary={
            <React.Fragment>
            <List style={{padding:0}}>
                  <ListItem style={{padding:0}}>
                   <ListItemAvatar style={{minWidth:30}}> 
                    <Avatar src={process.env.PUBLIC_URL + "/"+ val.user.avatar} aria-label="event" className={classes.avatar}/>
                   </ListItemAvatar> 
                   <ListItemText 
                  primary={<Typography variant="caption" style={{color:colors.grey[800]}}>{val.user.screen_name}</Typography>}
                  secondary={<Typography variant="caption" style={{color:colors.grey[800]}}>@{val.user.sns_id}・
                  {dayEditor().to(dayEditor(val.update_at))}
                  </Typography>}/>
                  </ListItem>
             </List>
            </React.Fragment>
          }
          />
          { session !== undefined  && session.auth.id == val.user_id &&
           <ListItemSecondaryAction  >
              <div>
               <IconButton size="small" edge="end" data-id={val.id} aria-controls={"menu" + val.id} aria-haspopup="true"
                onClick={(e) => this.handleEdit(e)} aria-label="edit">
                      <BuildIcon style={{fontSize:20}} />
                </IconButton>
              </div>
           </ListItemSecondaryAction>
          }
        </ListItem>
          )
        )
      }
      </List>
      <Menu 
                 keepMounted
                 anchorEl={this.state.anchorEl}
                 open={Boolean(this.state.anchorEl)}
                 onClose={(e) => this.handleClose()}
                 id="menu"
                >
                <MenuItem onClick={() => this.handeleLink("/creation?cid=" + this.state.anchorEl?.getAttribute("data-id")) }>編集</MenuItem>
                <MenuItem onClick={() => this.handeleLink("/pa_management?cid=" + this.state.anchorEl?.getAttribute("data-id")) } >参加管理</MenuItem>
                <MenuItem onClick={() => this.handeleLink("/compe_management?cid=" + this.state.anchorEl?.getAttribute("data-id")) } >ペアリング</MenuItem>
                </Menu>
      </>
    )
  }
}

export default withRouter(withStyles(styles,{withTheme:true})(EventList))
