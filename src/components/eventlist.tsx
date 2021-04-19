import React from 'react'
import {createStyles,Theme,withStyles,WithStyles} from '@material-ui/core/styles/'
import {withRouter,RouteComponentProps} from 'react-router-dom'
import List from '@material-ui/core/List'
import {Menu,MenuItem} from '@material-ui/core/'
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
  inline: {
    display:'inline'
  },
  day: {
    color:theme.palette.primary.dark,
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
      <List className={classes.root}  style={{paddingTop:0,paddingBottom:0}}>
        { data.map((val)=>
          (
          <ListItem key={val.id} divider onClick={()=>this.handleClick(val.id)}  button alignItems="flex-start" >
          <ListItemAvatar>
            <Avatar src={process.env.PUBLIC_URL + "/" + val.user.avatar}/>
          </ListItemAvatar>
          <ListItemText
            primary={
            <React.Fragment>
              <Typography variant="h3" className={classes.day}>
               {val.event_day === null ? "日時未定": dataFormatwithday(val.event_day)} 
               </Typography>
               <Typography variant="body2" style={{fontWeight:"bold"}}>
               {val.title}
               </Typography>
               <Typography variant="body2">
               {val.place_text}
               </Typography>
            </React.Fragment>
            }
            secondary={
            <React.Fragment>
              <Typography
                variant="caption"
                className={classes.inline}
                color="textPrimary"
              >
              {val.user.screen_name}@{val.user.sns_id}・{dayEditor().to(dayEditor(val.update_at))}
              </Typography>
            </React.Fragment>
          }
          />
          { session !== undefined  && session.auth.id == val.user_id &&
           <ListItemSecondaryAction  >
              <div>
               <IconButton edge="end" data-id={val.id} aria-controls={"menu" + val.id} aria-haspopup="true" onClick={(e) => this.handleEdit(e)} aria-label="edit">
                      <BuildIcon />
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
                <MenuItem onClick={() => this.handeleLink("/compe_management?cid=" + this.state.anchorEl?.getAttribute("data-id")) } >コンペ管理</MenuItem>
                </Menu>
      </>
    )
  }
}

export default withRouter(withStyles(styles,{withTheme:true})(EventList))
