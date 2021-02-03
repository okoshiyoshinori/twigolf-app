import React from 'react'
import {OverView} from '../store/competition/types'
import {createStyles,Theme,withStyles} from '@material-ui/core/styles/'
import {Card,CardMedia,CardHeader,CardContent,Avatar,Typography,Divider} from '@material-ui/core/'
import { red } from '@material-ui/core/colors'

type Props = {
//  data: OverView 
  classes: any
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
  header: {
    color: theme.palette.common.black,
    backgroundColor: theme.palette.common.white,
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
    const {classes} = this.props
    return (
      <Card className={classes.root} elevation={1}>
            <CardContent className={classes.contents}>
        <Typography variant="h2" component="h2">
          ポーカー会PLO開催! 
        </Typography>
        <Typography variant="body2" component="p" style={{marginTop:"10px"}}>
        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
        </Typography>
      </CardContent>
        <CardHeader className={classes.header} avatar={
          <Avatar src={process.env.PUBLIC_URL + "/nanahara.jpg"} aria-label="event" className={classes.avatar}>
          </Avatar>
        }
        title="なな原くん@nexx"
        subheader={<Typography variant="caption">1日前</Typography>}
        />
     </Card>
    )
  }
}

export default withStyles(styles,{withTheme:true})(EventCard)
