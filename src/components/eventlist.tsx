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

interface Props extends RouteComponentProps,WithStyles<typeof styles>{
  editable?:boolean
}
interface State {}

const styles = (theme:Theme) => createStyles({
  root: {
    width:"100%",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display:'inline'
  }
})

class EventList extends React.Component<Props,State>{
  constructor(props:Props) {
    super(props)
  }
  render() {
    const {classes,editable} = this.props
    let editbutton
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
        <ListItem button alignItems="flex-start" >
          <ListItemAvatar>
            <Avatar src={process.env.PUBLIC_URL + "/nanahara.jpg"}/>
          </ListItemAvatar>
          <ListItemText
            primary={
               <Typography variant="h3">
               2/22（月）壁塗り/川越【DIY】店づくりサポーター大募集
               </Typography>
            }
            secondary={
            <React.Fragment>
              <Typography
                variant="caption"
                className={classes.inline}
                color="textPrimary"
              >
              nanaharakuso
              </Typography>
            </React.Fragment>
          }
          />
          {editbutton}
        </ListItem>
        <Divider component="li" variant="inset"/>
      </List>
    )
  }
}

export default withRouter(withStyles(styles,{withTheme:true})(EventList))
