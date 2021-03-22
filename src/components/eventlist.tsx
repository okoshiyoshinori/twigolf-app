import React from 'react'
import {createStyles,Theme,withStyles,WithStyles} from '@material-ui/core/styles/'
import {withRouter,RouteComponentProps} from 'react-router-dom'
import List from '@material-ui/core/List'
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

interface Props extends RouteComponentProps,WithStyles<typeof styles>{
  editable?:boolean
  data:Competition[]
}
interface State {}

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
  }
  handleClick(id:number) {
    this.props.history.push("/events/" + id)
  }
  render() {
    const {classes,editable,data} = this.props
    let editbutton:any
    if (editable) {
      editbutton = (
                          <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="edit">
                      <EditIcon/>
                    </IconButton>
                  </ListItemSecondaryAction>
      )
    }
    return (
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
               {val.event_day === null ? "日時未定": dataFormatwithday(val.event_day)}  {val.club === null ? val.place_text:val.club.name}
               </Typography>
               <Typography variant="h3">
               {val.title}
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
          {
          (editbutton)
          }
        </ListItem>
          )
        )
      }
      </List>
    )
  }
}

export default withRouter(withStyles(styles,{withTheme:true})(EventList))
